const express = require('express');

const router = express.Router();

const carritoController = require('../controller/carritoController');

router.get('/', carritoController.index)
module.exports = router;