const client = require('../helpers/cassandraClient');
const CASSANDRA_NULL_VALUE = require('../config/database').CASSANDRA_NULL_VALUE;


exports.create = function(body) {
    const query = "insert into project (id, name) values (?, ?)";
    const args = [body.id, body.name];
    return client.execute(query, args);

};

exports.getById = function(body) {
    const id = body.id;
    const query = "select * from project where id = ?";
    return client.execute(query, [id]);
};

exports.getAvailableSites = function(id) {
    const filters = [CASSANDRA_NULL_VALUE, id];
    let updates = [];
    filters.forEach(function(filter) {
        updates.push(client.execute("select * from site where project_uid=? ALLOW FILTERING", [filter]));
    });
    return Promise.all(updates);
};


exports.getAll = function() {
    const query = "select * from project";
    return client.execute(query);
};

exports.delete = function(id, assignedSites) {
    assignedSites = assignedSites || [];
    let updates = [];
    assignedSites.forEach(site => {
        updates.push(client.execute("update site set project_id = ? where id = ?", [CASSANDRA_NULL_VALUE, site.id]));
    });
    updates.push(client.execute("delete from project where id = ?", [id]));
    return Promise.all(updates);
};

exports.updateSites = function(sites, id) {
    id = id || CASSANDRA_NULL_VALUE;
    sites = sites || [];
    let updates = [];
    sites.forEach(function(site) {
        updates.push(client.execute("update site set project_id = ? where id = ?", [id, site.id]));
    });
    return Promise.all(updates);
};

exports.update = function(body) {
    var updates = [];
    for(var field in body){
        if(body[field] && field != 'id' && field != 'sites'){
            updates.push(client.execute("update project set "+field+" = ? where id = ?", [body[field], body.id]));
        }
    }
    return Promise.all(updates);
};