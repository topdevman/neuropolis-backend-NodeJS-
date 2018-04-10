var express = require('express');
var router = express.Router();
var brandController = require('../controllers/brand');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);

router.get('/', brandController.get);
module.exports = router;