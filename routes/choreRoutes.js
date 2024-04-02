const express = require('express');
const controller = require('../controllers/choreController');
const {isLoggedIn} = require('../middlewares/auth');
const router = express.Router();

//GET /
router.get('/', controller.index);

//POST /events: create a new event
router.post('/', isLoggedIn, controller.create);

//DELETE /chores/:id delete the chore identified by id
router.delete('/:id', isLoggedIn, controller.delete);


module.exports = router;