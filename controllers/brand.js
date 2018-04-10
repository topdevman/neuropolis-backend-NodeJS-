var brandModel = require('../models/brand');

const get = async (req, res, next) => {
    try{
        var response = (await brandModel.get(req.query));
    }catch (e){
        return next(e);
    }
    return res.status(200).json(response.rows);
};
exports.get = get;