var express = require('express');
var router = express.Router();
var stats_prefsController = require('../controllers/stats_prefs');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);


router.post('/', stats_prefsController.create);

router.get('/', stats_prefsController.get);

router.put('/', stats_prefsController.update);

router.delete('/', stats_prefsController.del);

router.get('/axis', stats_prefsController.getAxis);

router.get('/data', stats_prefsController.getData);

module.exports = router;
