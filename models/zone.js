var config = require('../config/database');
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: config.keyspace, encoding: {
        map: Map,
        set: Set
    }});
client.connect(function(err, result){
    console.log('Zone model: cassandra connected');
})

exports.create = function(values) {
    var args = [values.nameZone, values.site_id, values.site_associated, values.pointsZone];
    var queryStr = "insert into zone (id, name, site_id, site_name, pointszone) values(uuid(), ?, ?, ?, ?)";

    return client.execute(queryStr, args, { prepare: true});

};

exports.get = function(values) {
    if(values.id) {
        var query = "select * from zone where id = ?";
        return client.execute(query, [values.id]);
    } else if(values.name) {
        var query = "select * from zone where name = ? allow filtering";
        return client.execute(query, [values.name]);
    } else if(values.site_name){
        var query = "select * from zone where site_name = ? allow filtering";
        return client.execute(query, [values.site_name]);
    } else if(values.site_id){
        return client.execute("select * from zone where site_id = ? allow filtering", [values.site_id]);
    }
    else {
        var query = "select * from zone";
        return client.execute(query);
    }
};

exports.update = function(body) {
    var updates = [];
    for(var field in body){
        if(body[field] && field != 'id'){
            updates.push(client.execute("update zone set "+field+" = ? where id = ?", [body[field], body.id]));
        }
    }
    return Promise.all(updates);
};

exports.delete = function(id) {
    var query = "delete from zone where id = ?";
    return client.execute(query, [id]);
}