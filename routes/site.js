var express = require('express');
var router = express.Router();
var siteController = require('../controllers/site');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);


router.post('/', siteController.create);

router.get('/', siteController.get);

router.put('/', siteController.update);

router.delete('/', siteController.del);

module.exports = router;
