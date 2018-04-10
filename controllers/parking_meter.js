var parking_meterModel = require('../models/parking_meter');

const create = async (req, res, next) => {
    try{
        var response = (await parking_meterModel.create(req.body));
    }catch (e){
        return next(e);
    }
    return res.status(201).json({message: 'created.'});
};

const get = async (req, res, next) => {
    try{
        var response = (await parking_meterModel.get(req.query));
    }catch (e){
        return next(e);
    }
    return res.status(200).json(response.rows);
};

const update = async (req, res, next) => {
    try {
        var checkIfExist = (await parking_meterModel.get(req.body));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0){
        try {
            var response = (await parking_meterModel.update(req.body));
        }catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'success'});
    }
    return res.status(202).json({error: 'Invalid parking_meter data.'});
};

const del = async (req, res, next) => {
    try {
        var checkIfExist = (await parking_meterModel.get(req.query));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0) {
        try {
            var response = (await parking_meterModel.delete(req.query.id));
        } catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'success.'});
    }
    return res.status(202).json({error: 'Invalid parking_meter data.'});
};

exports.create = create;
exports.get = get;
exports.update = update;
exports.del = del;