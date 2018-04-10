var express = require('express');
var router = express.Router();
var usertypeController = require('../controllers/usertype');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);

router.post('/', usertypeController.create);

router.get('/', usertypeController.get);

router.put('/', usertypeController.update);

router.delete('/', usertypeController.del);


module.exports = router;