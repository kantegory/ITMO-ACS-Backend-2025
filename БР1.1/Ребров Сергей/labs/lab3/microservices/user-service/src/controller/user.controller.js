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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdOrEmail = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const user_1 = require("../entity/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, description, roleId } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
        const user = new user_1.User();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;
        user.description = description;
        user.role = { id: roleId };
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createUser = createUser;
const getUsers = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find({ relations: ["role"] });
        const sanitizedUsers = users.map((_a) => {
            var { password } = _a, rest = __rest(_a, ["password"]);
            return rest;
        });
        res.status(200).json(sanitizedUsers);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        const { password } = user, sanitizedUser = __rest(user, ["password"]);
        res.status(200).json(sanitizedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        if (password) {
            user.password = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
        }
        user.description = description;
        user.role = { id: roleId };
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        res.status(204).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
            res.status(200).json(user);
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
            res.status(200).json(user);
            return;
        }
        res.status(400).json({ message: "Please provide either id or email" });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getUserByIdOrEmail = getUserByIdOrEmail;
