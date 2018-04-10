var express = require('express');
var router = express.Router();
var uploadController = require('../controllers/upload');
var authMiddware = require('../middelware/authMiddware');

//router.use(authMiddware);


router.post('/', uploadController.upload);

module.exports = router;