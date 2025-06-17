"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByIdOrEmail = exports.getUsers = void 0;
const app_data_source_1 = require("../config/app-data-source");
const User_1 = require("../entities/User");
const userRepository = app_data_source_1.AppDataSource.getRepository(User_1.User);
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository.find();
    res.json(users);
});
exports.getUsers = getUsers;
const getUserByIdOrEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email } = req.query;
    let user;
    if (email) {
        user = yield userRepository.findOneBy({ email: String(email) });
    }
    else {
        user = yield userRepository.findOneBy({ id: Number(id) });
    }
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});
exports.getUserByIdOrEmail = getUserByIdOrEmail;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = userRepository.create(req.body);
    const result = yield userRepository.save(newUser);
    res.status(201).json(result);
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield userRepository.update(id, req.body);
    res.json({ message: 'User updated' });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield userRepository.delete(id);
    res.json({ message: 'User deleted' });
});
exports.deleteUser = deleteUser;
