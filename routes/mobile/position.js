var express = require('express');
var router = express.Router();
var socketController = require('../../controllers/socketio');

router.post('/syncPosition', socketController.sync_position);
router.post('/initPosition', socketController.sync_position);

module.exports = router;