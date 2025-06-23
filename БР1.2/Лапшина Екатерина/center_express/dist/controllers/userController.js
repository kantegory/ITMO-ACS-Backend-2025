"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getClients = exports.getAgents = exports.getAllUsers = void 0;
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
// @ts-ignore
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository = database_1.AppDataSource.getRepository(User_1.User);
const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.find({
            select: ["UserID", "username", "first_name", "last_name", "email", "is_staff", "is_active"]
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};
exports.getAllUsers = getAllUsers;
const getAgents = async (req, res) => {
    try {
        const agents = await userRepository.find({
            where: { is_staff: true },
            select: ["UserID", "username", "first_name", "last_name", "email", "is_active"]
        });
        res.json(agents);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching agents", error });
    }
};
exports.getAgents = getAgents;
const getClients = async (req, res) => {
    try {
        const clients = await userRepository.find({
            where: { is_staff: false },
            select: ["UserID", "username", "first_name", "last_name", "email", "is_active"]
        });
        res.json(clients);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching clients", error });
    }
};
exports.getClients = getClients;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userRepository.findOne({ where: { UserID: parseInt(id) } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const { username, first_name, last_name, email, password, Passport, Phone, BirthDate, is_staff } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = userRepository.create({
            username,
            first_name,
            last_name,
            email,
            password: hashedPassword,
            Passport,
            Phone,
            BirthDate: BirthDate ? new Date(BirthDate) : undefined,
            is_staff: is_staff || false
        });
        const savedUser = await userRepository.save(user);
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (updateData.password) {
            updateData.password = await bcryptjs_1.default.hash(updateData.password, 10);
        }
        if (updateData.BirthDate) {
            updateData.BirthDate = new Date(updateData.BirthDate);
        }
        await userRepository.update(id, updateData);
        const updatedUser = await userRepository.findOne({ where: { UserID: parseInt(id) } });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userRepository.delete(id);
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
exports.deleteUser = deleteUser;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userRepository.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const expiresIn = process.env.JWT_EXPIRES_IN || "24h";
        const jwtSecret = process.env.JWT_SECRET || "fallback-secret";
        const token = jsonwebtoken_1.default.sign({ userId: user.UserID, username: user.username }, jwtSecret, { expiresIn });
        res.json({ token, user: { UserID: user.UserID, username: user.username, email: user.email } });
    }
    catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
};
exports.login = login;
//# sourceMappingURL=userController.js.map