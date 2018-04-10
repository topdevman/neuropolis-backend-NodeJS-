var express = require('express');
var router = express.Router();
var teamController = require('../controllers/team');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);


router.post('/', teamController.create);

router.get('/', teamController.get);

router.put('/', teamController.update);

router.put('/bulk', teamController.updateBulk);

router.delete('/', teamController.del);

module.exports = router;
