var express = require('express');
var router = express.Router();
var job_typeController = require('../controllers/job_type');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);

router.post('/', job_typeController.create);

router.get('/', job_typeController.get);

router.put('/', job_typeController.update);

router.delete('/', job_typeController.del);


module.exports = router;