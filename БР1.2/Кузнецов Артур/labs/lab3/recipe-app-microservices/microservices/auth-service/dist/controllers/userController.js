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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserMe = exports.getUser = exports.getUsers = exports.createUser = void 0;
const User_1 = require("../models/User");
const database_1 = require("../config/database");
const Role_1 = require("../models/Role");
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const userRepository = database_1.AppDataSource.getRepository(User_1.User);
const roleRepository = database_1.AppDataSource.getRepository(Role_1.Role);
const createUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, first_name, last_name } = req.body;
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            res.status(400).json({ message: 'Invalid or missing email' });
            return;
        }
        if (!password || password.length < 8) {
            res.status(400).json({ message: 'Password must be at least 8 characters' });
            return;
        }
        if (!first_name || !last_name || typeof first_name !== 'string' || typeof last_name !== 'string') {
            res.status(400).json({ message: 'Invalid or missing first_name or last_name' });
            return;
        }
        const existingUser = yield userRepository.findOneBy({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already in use' });
            return;
        }
        const hashedPassword = (0, hashPassword_1.default)(password);
        const defaultRole = yield roleRepository.findOneBy({ name: 'user' });
        if (!defaultRole) {
            res.status(500).json({ message: 'Default role "user" not found' });
            return;
        }
        const newUser = userRepository.create({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            role: defaultRole,
        });
        const savedUser = yield userRepository.save(newUser);
        res.status(201).json({
            id: savedUser.id,
            email: savedUser.email,
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
        });
    });
};
exports.createUser = createUser;
const getUsers = function (_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield userRepository
            .createQueryBuilder('user')
            .select([
            'user.id',
            'user.first_name',
            'user.last_name',
            'role.id',
            'role.name',
        ])
            .leftJoin('user.role', 'role')
            .getMany();
        res.json(users);
    });
};
exports.getUsers = getUsers;
const getUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const user = yield userRepository
            .createQueryBuilder('user')
            .select([
            'user.id',
            'user.first_name',
            'user.last_name',
            'role.id',
            'role.name',
        ])
            .leftJoin('user.role', 'role')
            .where('user.id = :id', { id })
            .getOne();
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    });
};
exports.getUser = getUser;
const getUserMe = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const user = yield userRepository
            .createQueryBuilder('user')
            .select([
            'user.id',
            'user.first_name',
            'user.last_name',
            'role.id',
            'role.name',
        ])
            .leftJoin('user.role', 'role')
            .where('user.id = :id', { id: userId })
            .getOne();
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    });
};
exports.getUserMe = getUserMe;
const updateUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const updatedData = req.body;
        if (updatedData.email && !updatedData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            res.status(400).json({ message: 'Invalid email format' });
            return;
        }
        if (updatedData.first_name && typeof updatedData.first_name !== 'string') {
            res.status(400).json({ message: 'Invalid first_name' });
            return;
        }
        if (updatedData.last_name && typeof updatedData.last_name !== 'string') {
            res.status(400).json({ message: 'Invalid last_name' });
            return;
        }
        const result = yield userRepository.update(id, updatedData);
        if (result.affected === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User updated successfully' });
    });
};
exports.updateUser = updateUser;
const deleteUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const result = yield userRepository.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(204).send();
    });
};
exports.deleteUser = deleteUser;
