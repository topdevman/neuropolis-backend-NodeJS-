var client = require('../helpers/cassandraClient');

exports.create = function(body) {
    var query = "insert into usertype (nametype, apprights, viewrights) values (?, ?, ?)";
    var args = [body.nametype, body.apprights, body.viewrights];

    return client.execute(query, args);

};

exports.get = function(query) {
    if(query.nametype) {
        var query = "select * from usertype where nametype = ?";
        return client.execute(query, [query.nametype]);
    } else if(query.apprights) {
        var query = "select * from usertype where apprights = ?";
        return client.execute(query, [query.apprights]);
    } else if(query.viewrights) {
        var query = "select * from usertype where viewrights = ?";
        return client.execute(query, [query.viewrights]);
    } else {
        return client.execute("select * from usertype");
    }
};

exports.delete = function(nametype) {
    var query = "delete from usertype where nametype = ?";
    return client.execute(query, [nametype]);
};

exports.update = function(body) {

    var updates = [];
    for(var field in body){
        if(body[field] && field != 'id'){
            updates.push(client.execute("update usertype set "+field+" = ? where id = ?", [body[field], body.id]));
        }
    }
    return Promise.all(updates);
};
