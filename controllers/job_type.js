var job_typeModel = require('../models/job_type');

const create = async (req, res, next) => {
    try{
        var response = (await job_typeModel.create(req.body));
    }catch (e){
        return next(e);
    }
    return res.status(201).json({message: 'created.'});
};

const get = async (req, res, next) => {
    try{
        var response = (await job_typeModel.get(req.query));
    }catch (e){
        return next(e);
    }
    return res.status(200).json(response.rows);
};

const update = async (req, res, next) => {
    try{
        var checkIfExist = (await job_typeModel.get(req.body));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0){
        try {
            var response = (await job_typeModel.update(req.body));
        }catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'success'});
    }
    return res.status(202).json({error: 'Invalid job_type data.'});
};

const del = async (req, res, next) => {
    try{
        var checkIfExist = (await job_typeModel.get(req.query));
    }catch(e){
        return next(e);
    }
    if(checkIfExist && checkIfExist.rowLength > 0) {
        try {
            var response = (await job_typeModel.delete(req.query.id));
        } catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'success'});
    } else{

    }
    return res.status(202).json({error: 'Invalid job_type data.'});
};

exports.create = create;
exports.get = get;
exports.update = update;
exports.del = del;