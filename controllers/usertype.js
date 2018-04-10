var usertypeModel = require('../models/usertype');

const create = async (req, res, next) => {
    try{
        var response = (await usertypeModel.create(req.body));
    }catch (e){
        return next(e);
    }
    return res.status(201).json(response.rows);
};

const get = async (req, res, next) => {
    try{
        var response = (await usertypeModel.get(req.query));
    }catch (e){
        return next(e);
    }
    return res.status(200).json(response.rows);
};

const update = async (req, res, next) => {
    try {
        var checkIfExist = (await usertypeModel.get(req.body));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0){
        try {
            var response = (await usertypeModel.update(req.body));
        }catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'success.'});
    }
    return res.status(202).json({error: 'Invalid usertype data.'});
};

const del = async (req, res, next) => {
    try {
        var checkIfExist = (await usertypeModel.get(req.query));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0) {
        try {
            var response = (await usertypeModel.delete(req.query.id));
        } catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'success.'});
    }
    return res.status(202).json({error: 'Invalid usertype data.'});
};

exports.create = create;
exports.get = get;
exports.update = update;
exports.del = del;