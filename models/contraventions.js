var client = require('../helpers/cassandraClient');
var stats_calc = require('../statistics/calculation');

exports.create = function(values) {
    var query = "insert into contraventions (id, date, employee_id, employee_name, site_id, vehicle_id, vehicle_type, money_amount) " + 
                "values (uuid(), ?, ?, ?, ?, ?, ?, ?)";
    return client.execute(query, [values.date, values.employee_id, values.employee_name, values.site_id, values.vehicle_id, values.vehicle_type, values.money_amount]);
};

function getAxis() {
    return { rows: [
        { name: 'price_transaction', label: 'Price', type: 'Number', x_enabled: true, y_enabled: true },
        { name: 'nb_contraventions', label: 'Number of contraventions', type: 'Number', x_enabled: false, y_enabled: true },
        { name: 'date_transaction', label: 'Date', type: 'Date', x_enabled: true, y_enabled: false },
        { name: 'name_employe', label: 'Employee', type: 'String', x_enabled: true, y_enabled: false },
    ]};
}

function getContraventions(params) {
    // IN operator for non-primary key is not allowed in CQL
    // So execute script for each site in given project and merge it
    if (params.project && !params.site)
    {
        return get_by_project(params);
    }

    // Prepare query string and parameters
    let query = 'select * from ' + 'contraventions';
    let queryParams = [];
    if (params) {
        // Compare from date
        if ('site' in params)
            queryParams.push("site_id = " + params['site']);
        if ('vehicle_type' in params)
            queryParams.push("vehicle_type = '" + params['vehicle_type'] + "'");
        if ('from' in params)
            queryParams.push("date >= '" + (params['from'] + ' 00:00:00') + "'");
        if ('to'   in params)
            queryParams.push("date <= '" + (params['to']   + ' 23:59:59') + "'");
    }
    if (queryParams.length > 0)
        query += ' where ' + queryParams.join(' and ') + ' ALLOW FILTERING';

    return client.execute(query);
}

const get_by_project = async (params) => {
    return new Promise((resolve, reject) => {
        let query = 'select * from site where project_uid = ' + params.project + ' allow filtering';
        client.execute(query).then(result => {
            let params2 = params;
            let contraventions = [], queries = [];
            for (let site of result.rows) {
                params2.site = site.id;
                queries.push(getContraventions(params2));
            }

            Promise.all(queries).then(function(values) {
                for (let value of values)
                    contraventions = contraventions.concat(value.rows);

                // Return as cql resultset
                resolve({ rows: contraventions });
            });
        }).catch(e => reject(e));
    });
}

exports.get = getContraventions;

function getKey(row_data, params) {
    if (params['chart_x'] == 'date_transaction')
        return stats_calc.getDateKey(row_data['date'], params);
    else if (params['chart_x'] == 'name_employe')
        return row_data['employee_id'];
    else if (params['chart_x'] == 'price_transaction')
        return row_data['money_amount'];

    return '';
}

function getLabel(row_data, params) {
    if (params['chart_x'] == 'date_transaction')
        return stats_calc.getDateLabel(row_data['date'], params);
    else if (params['chart_x'] == 'name_employe')
        return row_data['employee_name'];
    else if (params['chart_x'] == 'price_transaction')
        return row_data['money_amount'];

    return '';
}

exports.groupBy = function(rows, params) {
    // Define getters according to param
    let getValue = function(data, params) { return data['money_amount']; }

    // Group data first
    let data_grouped = {};
    for (let d of rows) {
        let index = getKey(d, params), value = getValue(d, params);
        if (!index || !value) continue;

        if (index in data_grouped) {
            data_grouped[index].value += value;
            data_grouped[index].count += 1;
        }
        else {
            data_grouped[index] = {
                label: getLabel(d, params),
                count: 1,
                value: value,
            };
        }
    }

    // Sort data
    let keys = Object.keys(data_grouped);
    let isDateKey = (params['chart_x'] == 'date_transaction');

    if (isDateKey)
        keys.sort(function(a, b) { return a - b; });
    else
        keys.sort();

    // Fill missing values
    if (isDateKey) {
        let start_key = params.from ? getKey({date: new Date(params.from)}, params) : parseInt(keys[0]);
        let end_key = params.to ? getKey({date: new Date(params.to)}, params) : parseInt(keys[keys.length - 1]);
        // Check there's missing values or not
        if (keys.length != end_key - start_key + 1) {
            keys = [];
            for (let k = start_key; k <= end_key; k++) {
                keys.push(k);
                if (!(k in data_grouped)) {
                    data_grouped[k] = {
                        label: stats_calc.getDateLabelFromKey(k, params),
                        count: 0,
                        value: 0
                    }
                }
            }
        }
    }

    // Calculate sum or average
    rows = [];
    // if (params.function == 'mean') {
    //     for (let k of keys) {
    //         rows.push({
    //             x: parseInt(k),
    //             y: (data_grouped[k].count == 0) ? 0 : (data_grouped[k].value / data_grouped[k].count),
    //             label: data_grouped[k].label
    //         });
    //     }
    // }
    // else /*if (params.function == 'sum')*/
    {
        let key = (params['chart_y'] == 'nb_contraventions') ? 'count' : 'value';
        let id = 0;
        for (let k of keys) {
            ++id;
            rows.push({
                x: isDateKey ? parseInt(k) : id,
                y: data_grouped[k][key],
                label: data_grouped[k].label
            });
        }
    }

    // Return data;
    let axis = getAxis().rows;
    return {
        x_label: axis.find(a => a.name == params['chart_x']).label,
        y_label: axis.find(a => a.name == params['chart_y']).label,
        values: rows
    };
}

exports.getAxis = getAxis;