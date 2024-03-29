const express = require('express');
const controller = require('../controllers/choreController');
const router = express.Router();

//GET /
router.get('/', controller.index);

module.exports = router;