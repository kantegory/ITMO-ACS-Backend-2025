"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = signJwt;
exports.verifyJwt = verifyJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';
const ACCESS_TOKEN_EXPIRES_IN = Number(process.env.JWT_EXPIRATION) || 3600;
function signJwt(payload, options = {}) {
    const signOptions = {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        ...options,
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, signOptions);
}
function verifyJwt(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
