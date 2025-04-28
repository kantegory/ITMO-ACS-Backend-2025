"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdOrEmail = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = async (req, res) => {
    const newUser = new User_1.default(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
};
exports.createUser = createUser;
const getUserByIdOrEmail = async (req, res) => {
    const { id, email } = req.query;
    const user = await User_1.default.findOne(id ? { _id: id } : { email });
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user);
};
exports.getUserByIdOrEmail = getUserByIdOrEmail;
