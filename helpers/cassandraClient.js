var config = require('../config/database');
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    keyspace: config.keyspace,
    encoding: { useUndefinedAsUnset: false }
});
client.connect(function(err, result){
    console.log('Cassandra connected');
});

module.exports = client;