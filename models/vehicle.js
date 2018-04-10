var client = require('../helpers/cassandraClient');

exports.create = function(body) {
    var queryStr = "insert into vehicle (id, licence_plate, color, issuedate, model, type, brand) values (uuid(), ?, ?, ?, ?, ?, ?)";
    var args = [body.licence_plate, body.color, new Date(body.issuedate), body.model, body.type, body.brand];
    console.log(args);
    return client.execute(queryStr, args);
};

exports.get = function(body) {
    console.log(body);
    var query, param;
    if(body.issuedate) {
        query = "select * from vehicle where issuedate = ? ALLOW FILTERING";
        param = body.issuedate;
    } else if (body.color) {
        query = "select * from vehicle where color = ? ALLOW FILTERING";
        param = body.color;
    } else if (body.brand) {
        query = "select * from vehicle where brand = ? ALLOW FILTERING";
        param = body.brand;
    } else if (body.licence_plate) {
        query = "select * from vehicle where licence_plate = ? ALLOW FILTERING";
        param = body.licence_plate;
    } else if (body.model) {
        query = "select * from vehicle where model = ? ALLOW FILTERING";
        param = body.model;
    } else if (body.type) {
        query = "select * from vehicle where type = ? ALLOW FILTERING";
        param = body.type;
    } else if (body.id) {
        query = "select * from vehicle where id = ?";
        param = body.id;
    } else {
        query = "select * from vehicle";
        return client.execute(query, []);
    }
    return client.execute(query, [param]);
};

exports.update = function(body){
    var updates = [];
    for(var field in body){
        if(body[field] && field != 'id'){
            updates.push(client.execute("update vehicle set "+field+" = ? where id = ?", [body[field], body.id]));
        }
    }
    return Promise.all(updates);
};

exports.delete = function(id) {
    var query = "delete from vehicle where id = ?";
    return client.execute(query, [id]);
};

exports.getModels = function(query) {
    if(query.fullmodel){
        return client.execute("select * from vehicle_model", [query.fullmodel]);
    }
    return client.execute("select * from vehicle_model");

};

exports.addModel = function(body) {
    var query = "insert into vehicle_model (fullmodel, vehicle_variant, brandname, vehicle_model) values (?, ?, ?, ?)";
    return client.execute(query, [body.fullmodel, body.vehicle_variant, body.brandname, body.vehicle_model]);
};

exports.removeModel = function(query) {
    var querystr = "delete from vehicle_model where fullmodel = ? allow filtering";
    return client.execute(querystr, [query.fullmodel]);
};

exports.getTypes = function(query) {
    if(query.id){
        return client.execute("select * from vehicle_type where id = ?", [query.id]);
    } else if(query.name){
        return client.execute("select * from vehicle_type where name = ? ALLOW FILTERING", [query.name]);
    }
    return client.execute("select * from vehicle_type");
};

exports.addType = function(body) {
    var query = "insert into vehicle_type (id, type_name) values (uuid(), ?)";
    return client.execute(query, [body.type_name]);
};

exports.removeType = function(query) {
    var querystr = "delete from vehicle_type where id = ?";
    return client.execute(querystr, [query.id]);
};