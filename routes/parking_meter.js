var express = require('express');
var router = express.Router();
var parking_meterController = require('../controllers/parking_meter');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);


router.post('/', parking_meterController.create);

router.get('/', parking_meterController.get);

router.put('/', parking_meterController.update);

router.delete('/', parking_meterController.del);

module.exports = router;
