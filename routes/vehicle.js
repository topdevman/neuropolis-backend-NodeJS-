var express = require('express');
var router = express.Router();
var vehicleController = require('../controllers/vehicle');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);


router.post('/', vehicleController.create);

router.get('/', vehicleController.get);

router.put('/', vehicleController.update);

router.delete('/', vehicleController.del);

router.get('/models', vehicleController.getModels);

router.post('/models', vehicleController.addModel);

router.delete('/models', vehicleController.removeModel);

router.get('/types', vehicleController.getTypes);

router.post('/types', vehicleController.addType);

router.delete('/types', vehicleController.removeType);

module.exports = router;
