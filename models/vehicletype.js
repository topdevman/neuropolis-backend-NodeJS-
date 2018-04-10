var client = require('../helpers/cassandraClient');

exports.get = function(values) {
    if(values.id) {
        return client.execute("select * from vehicle_type where id = ?", [values.id]);
    } else if(values.type_name) {
        return client.execute("select * from vehicle_type where brand_name = ? ALLOW FILTERING", [values.type_name]);
    } else {
        return client.execute("select * from vehicle_type");
    }
};