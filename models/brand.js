var client = require('../helpers/cassandraClient');

exports.get = function(values) {
    if(values.id) {
        return client.execute("select * from vehicle_brand where id = ?", [values.id]);
    } else if(values.brand_name) {
        return client.execute("select * from vehicle_brand where brand_name = ? ALLOW FILTERING", [values.brand_name]);
    } else {
        return client.execute("select * from vehicle_brand");
    }
};