var jwt = require('jsonwebtoken');
var config = require('../config/database');

module.exports = (req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.get('Authorization') || req.body.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(error, decoded) {
            if (error) {
                if(error.name == 'TokenExpiredError'){
                    return res.status(401).send({
                        success: false,
                        message: error.message
                    });
                }
            } else {
                // if everything is good, save to request for use in other routes
                req._user = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(401).send({
            message: 'Permission denied.'
        });

    }
};