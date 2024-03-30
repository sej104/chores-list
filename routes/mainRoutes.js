const express = require('express');
const controller = require('../controllers/mainController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const router = express.Router();

//GET /: get the login form
router.get('/', isGuest, controller.index);

module.exports = router;