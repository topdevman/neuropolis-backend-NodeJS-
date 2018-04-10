var client = require('../helpers/cassandraClient');

exports.create = function(values) {
    var latitude = Number(values.latitude);
    var longitude = Number(values.longitude);
    var queryStr = "insert into job (id, creation, creator_first_name, creator_last_name, car_licence_plate, car_brand, car_color, custom_job_description, job_type, latitude, longitude, zone_name) values(uuid(), ?,?,?,?,?,?,?,?,?,?,?)";
    var args = [new Date(),values.firstname, values.lastname, values.licence_plate, values.car_brand, values.car_color, values.job_description, values.type, latitude, longitude, values.zone];

    return client.execute(queryStr, args);
};

exports.get = function(values) {
    if(values.id) {
        var query = "select * from job where id = ?";
        return client.execute(query, [values.id]);
    } else if (values.type) {
        var query = "select * from job where job_type = ? ALLOW FILTERING";
        return client.execute(query, [values.type]);
    } else if(values.licence_plate) {
        var query = "select * from job where car_licence_plate = ? ALLOW FILTERING";
        return client.execute(query, [values.licence_plate]);
    } else if(values.zone_id) {
        return client.execute("select * from job where zone_id = ? allow filtering", [values.zone_id]);
    }
    else {
        var query = "select * from job";
        return client.execute(query);
    }
};

exports.update = function(body) {
    var updates = [];
    for(var field in body){
        if(body[field] && field != 'id' && field != 'latitude' && field != 'longitude'){
            updates.push(client.execute("update job set "+field+" = ? where id = ?", [body[field], body.id]));
        } else if(body[field] && field == 'latitude'){
            var latitude = Number(body[field]);
            updates.push(client.execute("update job set latitude = ? where id = ?", [latitude, body.id]));
        } else if(body[field] && field == 'longitude' && field != 'longitude'){
            var longitude = Number(body[field]);
            updates.push(client.execute("update job set longitude = ? where id = ?", [longitude, body.id]));
        }
    }
    return Promise.all(updates);
};

exports.delete = function(id) {
    var query = "delete from job where id = ?";
    return client.execute(query, [id]);
};