const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');
const router = express.Router();

//GET /users/new: get the new user form
router.get('/new', isGuest, controller.new);

//POST /users: create a new user
router.post('/', isGuest, controller.create);

//POST /users: authenticate user's login 
router.post('/login', isGuest, controller.login);

//GET /users/logout: logout the user
router.get('/logout', isLoggedIn, controller.logout);

//GET /users/delete: get the delete user page
router.get('/:id/delete', validateId, isLoggedIn, controller.getDeleteUser);

//DELETE /users/:id delete the user identified by id
router.delete('/:id', validateId, isLoggedIn, controller.delete);

module.exports = router;