//var bcrypt = require('bcrypt');
var config = require('../config/database');
var bcrypt = require('bcrypt');
var client = require('../helpers/cassandraClient');

exports.create = function(body) {
    var salt = config.secret;
    var hash = bcrypt.hashSync(body.password, salt);
    body.address = body.address || {};
    var query = "insert into user (id, username, password, entitle, usertype, address, first_name, last_name, teamright, siteright, picture) values (uuid(), ?, ?, ?, ?, {street : ?, zip_code : ?, city : ?, state : ?}, ?, ?, ?, ?, ?)";
    var args = [body.username, hash, body.entitle, body.usertype, body.address.street, body.address.zip_code, body.address.city, body.address.state, body.first_name, body.last_name, body.teamright, body.siteright, body.picture];

    return client.execute(query, args);

};

exports.getByUsername = function(body) {
    var username = body.username;
    var query = "select * from user where username = ? ALLOW FILTERING";
    return client.execute(query, [username]);
};

exports.get = function(body) {
    var id = body.id;
    var query = "select * from user where id = ?";
    return client.execute(query, [id]);
};


exports.getAll = function(query) {
    console.log(query);
    if(query.id){
        var querystr= "select * from user where id = ?";
        return client.execute(querystr, [query.id]);
    } else if(query.usertype){
        var querystr = "select * from user where usertype = ? ALLOW FILTERING";
        console.log(query.usertype);
        return client.execute(querystr, [query.usertype]);
    } else if(query.team){
        var querystr = "select * from user where team = ? ALLOW FILTERING";
        return client.execute(querystr, [query.team]);
    } else if(query.username) {
        var querystr = "select * from user where username = ? ALLOW FILTERING";
        return client.execute(querystr, [query.username]);
    } else{
        var queryStr = "select * from user";
        return client.execute(queryStr);
    }
};

exports.getByUsertype = function() {
    var query_str = "select * from user where usertype = ? ALLOW FILTERING";
    return client.execute(query_str);
}

exports.delete = function(id) {
    var query = "delete from user where id = ?";
    return client.execute(query, [id]);
};

exports.update = function(body) {
    var updates = [];
    for(var field in body){
        if(body[field] && field != 'id' && field != 'password'){
            if(field === 'address') {
                updates.push(client.execute("update user set address = {street : ?, zip_code : ?, city : ?, state : ?} where id = ?", [body['address']['street'], body['address']['zip_code'], body['address']['city'], body['address']['state'], body.id]));
            } else {
                updates.push(client.execute("update user set "+field+" = ? where id = ?", [body[field], body.id]));
            }
        }
    }
    return Promise.all(updates);
};

exports.checkPassword = function(body, user) {
    var username = user.username;
    var query = "select * from user where username = ? AND password = ? ALLOW FILTERING";
    var hash = bcrypt.hashSync(body.password, config.secret);
    return client.execute(query, [username, hash]);
};