var client = require('../helpers/cassandraClient');

exports.get = function(values) {
    if(values.id) {
        return client.execute("select * from vehicle_color where id = ?", [values.id]);
    } else if(values.color_name) {
        return client.execute("select * from vehicle_color where brand_name = ? ALLOW FILTERING", [values.color_name]);
    } else {
        return client.execute("select * from vehicle_color");
    }
};