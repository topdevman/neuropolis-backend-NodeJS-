var siteModel = require('../models/site');

const create = async (req, res, next) => {
    try{
        var response = (await siteModel.create(req.body));
    }catch (e){
        return next(e);
    }
    return res.status(201).json({message: 'created.'});
};

const get = async (req, res, next) => {
    try{
        var response = (await siteModel.get(req.query));
    }catch (e){
        return next(e);
    }
    return res.status(200).json(response.rows);
};

const update = async (req, res, next) => {
    try{
        var checkIfExist = (await siteModel.get(req.body));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0){
        try {
            var response = (await siteModel.update(req.body));
        }catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'success.'});
    }else{
        return res.status(202).json({error: 'Invalid site data.'});
    }
};

const del = async (req, res, next) => {
    try{
        var checkIfExist = (await siteModel.get(req.query));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0){
        try {
            var response = (await siteModel.delete(req.query.id));
        } catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'success.'});
    }else {
        return res.status(202).json({error: 'Invalid site data.'});
    }
};

exports.create = create;
exports.get = get;
exports.update = update;
exports.del = del;