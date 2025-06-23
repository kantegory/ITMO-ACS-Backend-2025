"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "fallback-secret");
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepository.findOne({ where: { UserID: decoded.userId } });
        if (!user) {
            return res.status(401).json({ message: "Invalid token." });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};
exports.authMiddleware = authMiddleware;
const optionalAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "fallback-secret");
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
            const user = await userRepository.findOne({ where: { UserID: decoded.userId } });
            req.user = user || undefined;
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuthMiddleware = optionalAuthMiddleware;
//# sourceMappingURL=auth.js.map