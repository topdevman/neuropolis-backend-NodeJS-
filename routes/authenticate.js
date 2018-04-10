var express = require('express');
var router = express.Router();
var authController = require('../controllers/authenticate');

/* Authenticate user */
router.post('/authenticate', authController.auth);

module.exports = router;