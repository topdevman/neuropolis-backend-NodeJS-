var vehicleModel = require('../models/vehicle');

const create = async (req, res, next) => {
    try{
        console.log(req.body);
        var response = (await vehicleModel.create(req.body));
    }catch (e){
        return next(e);
    }
    return res.status(201).json({message: 'success.'});
};

const get = async (req, res, next) => {
    try{
        var response = (await vehicleModel.get(req.query));
    }catch (e){
        return next(e);
    }
    return res.status(200).json(response.rows);
};

const update = async (req, res, next) => {
    try {
        var checkIfExist = (await vehicleModel.get(req.body.id));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0) {
        try{
            var response = (await vehicleModel.update(req.body));
        }catch (e) {
            return next(e);
        }
        return res.status(200).json({message: 'success.'});
    }
    return res.status(200).json({error: 'Invalid vehicle data.'});
};

const del = async (req, res, next) => {
    try {
        var checkIfExist = (await vehicleModel.get(req.query));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0) {
        try{
            var response = (await vehicleModel.delete(req.query.id));
        } catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'success.'});
    }
    return res.status(202).json({error: 'Invalid vehicle data.'});
};

const getModels = async (req, res, next) => {
    try{
        var response = (await vehicleModel.getModels(req.body));
    } catch (e) {
        return next(e);
    }
    return res.status(202).json(response.rows);
};

const addModel = async (req, res, next) => {
    try{
        var response = (await vehicleModel.addModel(req.body));
    } catch (e) {
        return next(e);
    }
    return res.status(202).json({message: 'success.'});
};

const removeModel = async (req, res, next) => {
    try {
        var checkIfExist = (await vehicleModel.getModels(req.query));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0) {
        try{
            var response = (await vehicleModel.removeModel(req.query));
        } catch(e) {
            return next(e);
        }
        return res.status(200).json({message: 'success.'});
    }
    return res.status(200).json({error: 'Invalid model data.'});
};

const getTypes = async (req, res, next) => {
    try{
        var response = (await vehicleModel.getTypes(req.query));
    } catch (e) {
        return next(e);
    }
    return res.status(202).json(response.rows);
};

const addType = async (req, res, next) => {
    try{
        var response = (await vehicleModel.addType(req.body));
    } catch (e) {
        return next(e);
    }
    return res.status(202).json({message: 'success.'});
};

const removeType = async (req, res, next) => {
    try {
        var checkIfExist = (await vehicleModel.getTypes(req.query));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0){
        try{
            var response = (await vehicleModel.removeType(req.query));
        } catch(e) {
            return next(e);
        }
        return res.status(200).json({message: 'success.'});
    }
    return res.status(200).json({error: 'Invalid vehicle_type data.'});
};

exports.create = create;
exports.get = get;
exports.update = update;
exports.del = del;
exports.getModels = getModels;
exports.addModel = addModel;
exports.removeModel = removeModel;
exports.getTypes = getTypes;
exports.addType = addType;
exports.removeType = removeType;
