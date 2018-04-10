var client = require('../helpers/cassandraClient');
const CASSANDRA_NULL_VALUE = require('../config/database').CASSANDRA_NULL_VALUE;

exports.create = function(values) {
    if (!values.project_uid) {
        values.project_uid = CASSANDRA_NULL_VALUE
    }
    values.address = values.address || {};
    var queryStr = "insert into site (id, name, address, type) values (uuid(), ?, {zip_code:?, street:?, city:?, state:?}, ?)";
    var args = [values.name, values.address.zip_code, values.address.street, values.address.city, values.address.state, values.type];
    console.log(args);
    return client.execute(queryStr, args);

};

exports.get = function(values) {
    if(values.id) {
        return client.execute("select * from site where id = ?", [values.id]);
    } else if(values.name) {
        return client.execute("select * from site where name = ? ALLOW FILTERING", [values.name]);
    } else {
        return client.execute("select * from site");
    }
};

exports.getByProjectId = function(id) {
    return client.execute("select id, name from site where project_uid = ? ALLOW FILTERING", [id]);
};

exports.update = function(body) {
    if (!body.project_uid) {
        body.project_uid = CASSANDRA_NULL_VALUE
    }
    var updates = [];
    for(var field in body){
        if(body[field] && field != 'id'){
            if(field === 'address') {
                updates.push(client.execute("update site set address = {street : ?, zip_code : ?, city : ?, state : ?} where id = ?", [body['address']['street'], body['address']['zip_code'], body['address']['city'], body['address']['state'], body.id]));
            } else {
                updates.push(client.execute("update site set "+field+" = ? where id = ?", [body[field], body.id]));
            }
        }
    }
    return Promise.all(updates);
};

exports.delete = function(id) {
    var query = "delete from site where id = ?";
    return client.execute(query, [id]);
}