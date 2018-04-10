var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var authMiddware = require('../middelware/authMiddware');

router.use(authMiddware);

router.post('/', userController.create);

router.get('/', userController.getAll);

router.put('/', userController.update);

router.delete('/', userController.del);

/* get user profile */
router.get("/profile", (req, res, next) =>  {
    console.log("/profile");
    console.log(req._user);
    console.log("/profile END");
    return res.json({user: req._user});
});

module.exports = router;
