var express = require('express');
var router = express.Router();
var projectController = require('../controllers/project');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);


router.post('/', projectController.create);

router.get('/', projectController.getAll);

router.get('/:id/availableSites', projectController.getAvailableSites);
/*
router.put('/', projectController.update);*/

router.delete('/', projectController.del);

module.exports = router;
