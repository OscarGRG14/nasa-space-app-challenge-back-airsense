const express = require('express');
const { loginUser } = require('../controllers/userController');
const router = express.Router();

// Ruta para el login de los usuarios
router.post('/login', loginUser);

module.exports = router;