var express = require('express');
var router = express.Router();
var colorController = require('../controllers/color');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);

router.get('/', colorController.get);
module.exports = router;