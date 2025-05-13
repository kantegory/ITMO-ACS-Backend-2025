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
exports.getUserByIdOrEmail = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const user_1 = require("../entity/user");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, description, roleId } = req.body;
        const user = new user_1.User();
        user.name = name;
        user.email = email;
        user.password = password;
        user.description = description;
        user.role = { id: roleId };
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getUsers = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find({ relations: ["role"] });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }
        const user = yield user_1.User.findOne({
            where: { id },
            relations: ["role"],
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }
        const { name, email, password, description, roleId } = req.body;
        const user = yield user_1.User.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        user.name = name;
        user.email = email;
        user.password = password;
        user.description = description;
        user.role = { id: roleId };
        yield user.save();
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }
        const user = yield user_1.User.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        yield user.remove();
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const getUserByIdOrEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, email } = req.query;
        if (id) {
            const userId = parseInt(id, 10);
            if (isNaN(userId)) {
                res.status(400).json({ message: "Invalid id" });
                return;
            }
            const user = yield user_1.User.findOne({
                where: { id: userId },
                relations: ["role"],
            });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
            return;
        }
        if (email) {
            const user = yield user_1.User.findOne({
                where: { email: email },
                relations: ["role"],
            });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
            return;
        }
        res.status(400).json({ message: "Please provide either id or email" });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserByIdOrEmail = getUserByIdOrEmail;
