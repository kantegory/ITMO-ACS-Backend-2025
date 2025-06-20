"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = __importDefault(require("../config/settings"));
function verifyToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, settings_1.default.JWT_SECRET_KEY);
    const user = decoded?.user;
    if (!user?.id || !user?.mail) {
        throw new Error('Invalid token payload');
    }
    return user;
}
//# sourceMappingURL=verify-token.js.map