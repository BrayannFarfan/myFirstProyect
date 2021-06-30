const express = require('express');

const router = express.Router();

const inicioSesionController = require('../controller/inicioSesionController');

router.get('/', inicioSesionController.index)

module.exports = router;