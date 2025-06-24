"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = __importDefault(require("../config/settings"));
const authMiddleware = (request, response, next) => {
    const { headers } = request;
    const { authorization } = headers;
    if (!authorization) {
        return response
            .status(401)
            .send({ message: 'Unauthorized: no token provided' });
    }
    try {
        const [, accessToken] = authorization.split(' ');
        if (!accessToken) {
            return response
                .status(401)
                .send({ message: 'Unauthorized: no token provided' });
        }
        const decryptedToken = jsonwebtoken_1.default.verify(accessToken, settings_1.default.JWT_SECRET_KEY);
        if (!decryptedToken.id) {
            return response
                .status(401)
                .send({ message: 'Unauthorized: token is invalid' });
        }
        request.userId = decryptedToken.id;
        next();
    }
    catch (error) {
        console.error(error);
        return response
            .status(403)
            .send({ message: 'Forbidden: token is invalid or expired' });
    }
};
exports.default = authMiddleware;
