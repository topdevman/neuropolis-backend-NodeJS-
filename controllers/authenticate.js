var userModel = require('../models/user');
var config = require('../config/database');
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try {
        var result = (await userModel.getByUsername(req.body));
        if(!result || result.rowLength == 0){
            return res.json({success: false, msg: "User not found"});
        }
        var myuser = result.rows[0];
        var checkPassword = (await userModel.checkPassword(req.body, myuser));
        if(checkPassword && checkPassword.rowLength == 1){
            const token = jwt.sign(myuser, config.secret, {
                expiresIn: 604800
            });
            return res.status(201).json({
                success: true,
                token: token,
                user: {
                    id: myuser.id,
                    username: myuser.username,
                    firstname: myuser.first_name,
                    lastname: myuser.last_name,
                    usertype: myuser.usertype
                }
            });
        }else {
            return res.json({success: false, msg: "Login failed"});
        }
    } catch(e){
        return next(e);
    }
};

exports.auth = authenticate;