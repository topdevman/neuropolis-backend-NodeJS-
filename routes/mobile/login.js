var express = require('express');
var router = express.Router();
var authenticate = require('../../controllers/authenticate');

router.post('/login', authenticate.auth);

module.exports = router;