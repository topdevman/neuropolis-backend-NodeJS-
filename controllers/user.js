var userModel = require('../models/user');
var emailValidator = require('../helpers/emailValidator');
var emailSender = require('../helpers/emailSender');
var generatePassword = require('password-generator');

const create = async (req, res, next) => {
    if (req.body.username && emailValidator.validate(req.body.username)) {
        return userModel.getByUsername({username: req.body.username}).then(result => {
            if (result && result.rows && result.rows[0]) {
                return res.status(400).json({message: 'Username already exist'});
            } else {
                // generate password
                req.body.password = generatePassword(12, false);
                return userModel.create(req.body).then(result => {
                    // send Welcome email to new user
                    emailSender.welcome(req.body);
                    return res.status(201).json({message: 'created.'});
                }).catch(err => {
                    return res.status(400).json({message: err.message});
                });
            }
        }).catch(err => {
            return res.status(400).json({message: err.message});
        });
    } else if(!req.body.username) return res.status(400).json({message: 'Username is required'});
    else return res.status(400).json({message: 'Username is not valid'});
};

const getAll = async (req, res, next) => {
    try{
        var users = (await userModel.getAll(req.query));
    }catch(e){
        return next(e);
    }
    return res.json(users.rows);
};

const update = async (req, res, next) => {
    id = req.body.id;
    if(id) {
        return userModel.get({id: id}).then(result => {
            if (result && result.rows && result.rows[0]) {
                return userModel.update(req.body).then(UpdatedUser => {
                    return res.status(202).json({message: 'success.'});
                });
            } else return res.status(202).json({error: 'Invalid user data.'});
        });
    }
};

const del = async (req, res, next) => {
    id = req.query.id;
    if(id) {
        return userModel.get({id: id}).then(result => {
            if (result && result.rows && result.rows[0]) {
            return userModel.delete(id).then(deletedUser => {
                return res.status(202).json({message: 'success.'});
        });
        } else return res.status(202).json({error: 'Invalid user data.'});
    });
    }
};

exports.create = create;
exports.getAll = getAll;
exports.update = update;
exports.del = del;