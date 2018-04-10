var colorModel = require('../models/color');

const get = async (req, res, next) => {
    try{
        var response = (await colorModel.get(req.query));
    }catch (e){
        return next(e);
    }
    return res.status(200).json(response.rows);
};
exports.get = get;