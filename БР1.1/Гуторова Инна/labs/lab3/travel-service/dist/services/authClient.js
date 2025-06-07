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
exports.authClient = void 0;
const axios_1 = __importDefault(require("axios"));
class AuthClient {
    constructor() {
        this.authServiceBaseUrl = process.env.USER_SERVICE_URL || 'http://user-service:5000';
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                console.log(token);
                const response = yield axios_1.default.get(`${this.authServiceBaseUrl}/api/auth/verify-token`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (!response.data.user) {
                    throw new Error('Invalid user data in response');
                }
                return {
                    id: response.data.user.id,
                    email: response.data.user.email,
                    isAdmin: response.data.user.isAdmin
                };
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    console.error('Auth service error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                    throw new Error(((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Auth service unavailable');
                }
                throw new Error('Authentication failed');
            }
        });
    }
}
exports.authClient = new AuthClient();
