var zoneModel = require('../models/zone');

const create = async (req, res, next) => {
    try{
        var zone = (await zoneModel.create(req.body));
    }catch (e){
        return next(e);
    }
    return res.status(201).json({message: 'success'});
};

const get = async (req, res, next) => {
    try{
        var zones = (await zoneModel.get(req.query));
    }catch (e){
        return next(e);
    }
    return res.status(200).json(zones.rows);
};

const update = async (req, res, next) => {
    try{
        var checkIfExist = (await zoneModel.get(req.body));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0){
        try {
            var zones = (await zoneModel.update(req.body));
        }catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'success.'});
    }
    return res.status(202).json({error: 'Invalid zone data.'});
};

const del = async (req, res, next) => {
    try{
        var checkIfExist = (await zoneModel.get(req.query));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0){
        try {
            var zones = (await zoneModel.delete(req.query.id));
        } catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'success.'});
    }
    return res.status(202).json({error: 'Invalid zone data.'});
};

exports.create = create;
exports.get = get;
exports.update = update;
exports.del = del;