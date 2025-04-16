"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const Users_1 = require("../models/Users");
const userRepository = AppDataSource_1.AppDataSource.getRepository(Users_1.Users);
// Создание нового пользователя
const createUser = async function (req, res) {
    try {
        const userData = req.body;
        const user = userRepository.create(userData);
        const savedUser = await userRepository.save(user);
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createUser = createUser;
// Получение всех пользователей
const getUsers = async function (req, res) {
    try {
        const users = await userRepository.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUsers = getUsers;
// Получение одного пользователя по id
const getUser = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const user = await userRepository.findOneBy({ id: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUser = getUser;
// Обновление пользователя
const updateUser = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = await userRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUser = updateUser;
// Удаление пользователя
const deleteUser = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await userRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteUser = deleteUser;
