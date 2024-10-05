const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoID');
const { generateToken } = require('../configs/jwtTokenConfig');

// Función de crear usuario
const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser) {
        const newUser = await User.create(req.body);

        res.json(newUser);
    } else {
        throw new Error("Ya existe este usuario");
    }
});

// Función para el login del usuario
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser?._id,
            token: generateToken(
                findUser?._id,
            ),
        });
    } else {
        throw new Error("Credenciales Invalidas");
    }
});

// Función para editar usuario
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            {
                nombre: req?.body?.nombre,
                apellido: req?.body?.apellido,
                email: req?.body?.email,
            },
            {
                new: true,
            }
        );

        res.json(updateUser);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para obtener todos los usuarios
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para obtener un usuario
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaUser = await User.findById(id);
        res.json(getaUser);
    } catch (error) {
        throw new Error(error);
    }
});

// Eliminar un usuario
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    const userId = req.user._id; // Obtener el ID del usuario actualmente logueado desde req.user

    try {
        const userToDelete = await User.findById(id);

        // Verificar si el usuario a eliminar es el mismo que está logueado
        if (userToDelete._id.equals(userId)) {
            throw new Error("No puedes eliminar el usuario que está actualmente logueado");
        }

        // Eliminar el inventario asociado al usuario
        await Inventory.findOneAndDelete({ user: id });

        await User.findByIdAndDelete(id);

        res.json(userToDelete);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createUser, loginUser, updateUser, getAllUser, getUser, deleteUser };