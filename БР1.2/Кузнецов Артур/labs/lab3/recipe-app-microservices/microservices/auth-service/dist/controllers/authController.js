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
exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const database_1 = require("../config/database");
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const checkPassword_1 = __importDefault(require("../utils/checkPassword"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Role_1 = require("../models/Role");
const userRepository = database_1.AppDataSource.getRepository(User_1.User);
const roleRepository = database_1.AppDataSource.getRepository(Role_1.Role);
const register = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, first_name, last_name } = req.body;
        if (!email || !password || !first_name || !last_name) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            res.status(400).json({ message: 'Invalid email format' });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({ message: 'Password must be at least 8 characters long' });
            return;
        }
        if (first_name.length > 50 || last_name.length > 50) {
            res.status(400).json({ message: 'First name and last name must not exceed 50 characters' });
            return;
        }
        if (!/^[a-zA-Z\s-]+$/.test(first_name) || !/^[a-zA-Z\s-]+$/.test(last_name)) {
            res.status(400).json({ message: 'First name and last name must contain only letters, spaces, or hyphens' });
            return;
        }
        const existingUser = yield userRepository.findOneBy({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already in use' });
            return;
        }
        const defaultRole = yield roleRepository.findOneBy({ name: 'user' });
        if (!defaultRole) {
            res.status(500).json({ message: 'Default role "user" not found' });
            return;
        }
        const hashedPassword = (0, hashPassword_1.default)(password);
        const newUser = userRepository.create({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            role: defaultRole,
        });
        let savedUser;
        try {
            const savedResult = yield userRepository.save(newUser);
            if (Array.isArray(savedResult)) {
                res.status(500).json({ message: 'Expected a single User, but received an array' });
                return;
            }
            savedUser = savedResult;
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to save user' });
            return;
        }
        if (!process.env.JWT_SECRET) {
            res.status(500).json({ message: 'JWT secret not configured' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: savedUser.id, email: savedUser.email, role: savedUser.role.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            id: savedUser.id,
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
            token,
        });
    });
};
exports.register = register;
const login = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            res.status(400).json({ message: 'Invalid email format' });
            return;
        }
        const user = yield userRepository.findOne({
            where: { email },
            relations: ['role'],
        });
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }
        const isValid = (0, checkPassword_1.default)(user.password, password);
        if (!isValid) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        if (!process.env.JWT_SECRET) {
            res.status(500).json({ message: 'JWT secret not configured' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};
exports.login = login;
