const express = require('express');
const controller = require('../controllers/choreController');
const {isLoggedIn} = require('../middlewares/auth');
const router = express.Router();

//GET /: send all tasks to user
router.get('/', controller.index);

//GET /active: send tasks in progress
router.get('/active', controller.active);

//GET /assigned: send tasks assigned to other users
router.get('/assigned', controller.assigned);

//GET /completed: send completed tasks to other users
router.get('/completed', controller.completed);

//POST /events: create a new event
router.post('/', isLoggedIn, controller.create);

//DELETE /chores/:id delete the chore identified by id
router.delete('/:id', isLoggedIn, controller.delete);

//PUT /chore/:id update the chore identified by id
router.put('/:id', isLoggedIn, controller.update);

module.exports = router;