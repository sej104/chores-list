const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();

//GET /
router.get('/new', controller.new);

module.exports = router;