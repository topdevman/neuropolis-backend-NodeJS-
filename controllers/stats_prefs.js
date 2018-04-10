var stats_prefsModel = require('../models/stats_prefs');
var contraventions = require('../models/contraventions');

const create = async (req, res, next) => {
    try{
        var response = (await stats_prefsModel.create(req.body));
    }catch (e){
        return next(e);
    }
    return res.status(201).json(response.rows);
};

const get = async (req, res, next) => {
    try{
        var response = (await stats_prefsModel.get(req.query));
    }catch (e){
        return next(e);
    }
    return res.status(200).json(response.rows);
};

const update = async (req, res, next) => {
    try {
        var response = (await stats_prefsModel.update(req.body));
    }catch (e) {
        return next(e);
    }
    return res.status(202).json(response.rows);
};

const del = async (req, res, next) => {
    try{
        var checkIfChartExist = (await stats_prefsModel.get(req.query));
    } catch(e) {
        return next(e);
    }
    if (checkIfChartExist && checkIfChartExist.rowLength > 0){
        try {
            var response = (await stats_prefsModel.delete(req.query.id));
        } catch (e) {
            return next(e);
        }
        return res.status(202).json({message: 'deleted'});
    } else {
        return res.status(202).json({error: 'Invalid chart data.'});
    }
};

const getAxis = async (req, res, next) => {
    try{
        var response = contraventions.getAxis();
    }catch (e){
        return next(e);
    }
    return res.status(200).json(response.rows);
};

const getData = async (req, res, next)  => {
    try {
        var response = await contraventions.get(req.query);
        rows = contraventions.groupBy(response.rows, req.query);

        return res.status(200).json(rows);
    } catch (e){
        return next(e);
    }
};

exports.create = create;
exports.get = get;
exports.update = update;
exports.del = del;
exports.getAxis = getAxis;
exports.getData = getData;