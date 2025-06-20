"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServiceClient = void 0;
const axios_1 = __importDefault(require("axios"));
const USER_SERVICE_BASE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3001/api/v1';
exports.userServiceClient = {
    async getUserById(id) {
        const res = await axios_1.default.get(`${USER_SERVICE_BASE_URL}/users/${id}`);
        return res.data;
    },
};
//# sourceMappingURL=user-service.client.js.map