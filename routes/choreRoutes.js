const express = require('express');
const controller = require('../controllers/choreController');
const {isLoggedIn} = require('../middlewares/auth');
const router = express.Router();

//GET /
router.get('/', controller.index);

//POST /events: create a new event
router.post('/', isLoggedIn, controller.create);

module.exports = router;