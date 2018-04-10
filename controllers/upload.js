var multer = require('multer');

// multer setup
var DIR = './uploads/';
// multer disk storage settings
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});
var upload = multer({ storage: storage }).single('picture');

const uploadImage = (req, res, next) => {
    var path = '';
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        path;
        if (req.file && req.file.path) {
            path = req.file.path;
        }
        return res.json({url: path});
    });

};
exports.upload = uploadImage;