var express = require('express');
var router = express.Router();
var zoneController = require('../controllers/zone');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);


router.post('/', zoneController.create);

router.get('/', zoneController.get);

router.put('/', zoneController.update);

router.delete('/', zoneController.del);

module.exports = router;
