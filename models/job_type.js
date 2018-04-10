var client = require('../helpers/cassandraClient');

exports.create = function(body) {
    var query = "insert into job_type (id, type_name) values (uuid(), ?)";
    return client.execute(query, [body.type_name]);
};

exports.get = function(query) {
    if(query.id) {
        return client.execute("select * from job_type where id = ?", [query.id]);
    } else if(query.type_name) {
        return client.execute("select * from job_type where type_name = ? ALLOW FILTERING", [query.type_name]);
    } else {
        return client.execute("select * from job_type");
    }
};

exports.delete = function(id) {
    var query = "delete from job_type where id = ?";
    return client.execute(query, [nametype]);
};

exports.update = function(body) {

    var updates = [];
    for(var field in body){
        if(body[field] && field != 'id'){
            updates.push(client.execute("update job_type set "+field+" = ? where id = ?", [body[field], body.id]));
        }
    }
    return Promise.all(updates);
};
