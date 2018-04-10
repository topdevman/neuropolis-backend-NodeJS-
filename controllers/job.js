var jobModel = require('../models/job');

const create = async (req, res, next) => {
    try{
        var response = (await jobModel.create(req.body));
    }catch (e){
        return next(e);
    }
    return res.status(201).json({message: 'created.'});
};

const get = async (req, res, next) => {
    try{
        var response = (await jobModel.get(req.query));
    }catch (e){
        return next(e);
    }
    return res.status(200).json(response.rows);
};

const update = async (req, res, next) => {
    id = req.body.id;
    if(id) {
        return jobModel.get({id: id}).then(result => {
            if (result && result.rows && result.rows[0]) {
                return jobModel.update(req.body).then(UpdatedJob => {
                    return res.status(202).json({message: 'success.'});
                });
            } else return res.status(202).json({error: 'Invalid user data.'});
        }).catch(function(e){
            next(e);
        })
    }
};

const del = async (req, res, next) => {
    try{
        var checkIfJobExist = (await jobModel.get(req.query));
    }catch(e) {
        return next(e);
    }
    if(checkIfJobExist && checkIfJobExist.rowLength > 0){
        try {
            var response = (await jobModel.delete(req.query.id));
        } catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'deleted'});
    } else {
        return res.status(202).json({error: 'Invalid job data.'});
    }
};

exports.create = create;
exports.get = get;
exports.update = update;
exports.del = del;