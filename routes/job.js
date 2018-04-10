var express = require('express');
var router = express.Router();
var jobController = require('../controllers/job');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);

router.post('/', jobController.create);

router.get('/', jobController.get);

router.put('/', jobController.update);

router.delete('/', jobController.del);


module.exports = router;