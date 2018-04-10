var client = require('../helpers/cassandraClient');

exports.create = function(values) {
    var args = [values.zone, values.lat, values.lng];
    var queryStr = "insert into parking_meters (id, zone, lat, lng) values(uuid(), ?, ?, ?)";

    return client.execute(queryStr, args);

};

exports.get = function(values) {
    if(values.id) {
        return client.execute("select * from parking_meter where id = ?", [values.id]);
    } else if(values.lat && values.lng) {
        return client.execute("select * from parking_meter where lat = ? AND lng = ? ALLOW FILTERING", [values.lat, values.lng]);
    } else {
        return client.execute("select * from parking_meter");
    }
};

exports.update = function(body) {
    var updates = [];
    for(var field in body){
        if(body[field] && field != 'id'){
            updates.push(client.execute("update parking_meter set "+field+" = ? where id = ?", [body[field], body.id]));
        }
    }
    return Promise.all(updates);
};

exports.delete = function(id) {
    var query = "delete from parking_meter where id = ?";
    return client.execute(query, [id]);
}