const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const router = express.Router();

//GET /users/new: get the new user form
router.get('/new', isGuest, controller.new);

//POST /users: create a new user
router.post('/', isGuest, controller.create);

module.exports = router;