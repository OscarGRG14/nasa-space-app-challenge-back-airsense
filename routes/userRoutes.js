const express = require('express');
const { createUser, getAllUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

// Ruta para crear el usuario
router.post('/register', createUser);

// Ruta para obtener todos los usuarios
router.get('/get-all', getAllUser);

// Ruta para obtener un usuario por ID
router.get('/get/:id', getUser);

// Ruta para actualizar un usuario por ID
router.put('/update/:id', updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/delete/:id', deleteUser);

module.exports = router;