var jwt_decode = require('jwt-decode');
var server = require('../bin/www');
var users = require('../bin/www').users;

const sync_position = (req, res, next) =>  {
    var token = req.headers.authorization;
    var decoded = jwt_decode(token);
    decoded['latitude'] = req.body.latitude;
    decoded['longitude'] = req.body.longitude;
    server.io.sockets.emit('update_position', decoded);

    return res.send({response: 'success'});
};
exports.sync_position = sync_position;

