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
exports.authorizeAdmin = exports.authenticate = void 0;
const authClient_1 = require("../services/authClient");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Bearer token required' });
        }
        const token = authHeader.split(' ')[1];
        req.user = yield authClient_1.authClient.verifyToken(token);
        next();
    }
    catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({
            message: error.message || 'Authentication failed',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});
exports.authenticate = authenticate;
const authorizeAdmin = (req, res, next) => {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
