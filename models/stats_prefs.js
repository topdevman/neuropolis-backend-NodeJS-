var client = require('../helpers/cassandraClient');

exports.create = function(values) {
    var queryStr = "insert into stats_prefs (id, chart_title, username, chart_type, chart_x, chart_y, x_type, y_type, periode, function) values (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var list_values = [values.chart_title, values.username, values.chart_type, values.chart_x, values.chart_y, values.x_type, values.y_type, values.periode, values.function];
    return client.execute(queryStr, list_values);
};

exports.get = function(values) {
    if(values.id) {
        var query = "select * from stats_prefs where id = ?";
        return client.execute(query, [values.id]);
    } else if(values.name) {
        var query = "select * from stats_prefs where username = ? ALLOW FILTERING";
        return client.execute(query, [values.username]);
    } else {
        var query = "select * from stats_prefs";
        return client.execute(query);
    }
};

exports.update = function(body) {
    var updates = [];
    for(var field in body){
        if(body[field] && field != 'id'){
            updates.push(client.execute("update stats_prefs set "+field+" = ? where id = ?", [body[field], body.id]));
        }
    }
    return Promise.all(updates);
};

exports.delete = function(id) {
    var query = "delete from stats_prefs where id = ?";
    return client.execute(query, [id]);
};
