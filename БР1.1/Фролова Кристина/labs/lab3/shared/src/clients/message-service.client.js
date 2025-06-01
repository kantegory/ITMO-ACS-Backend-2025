"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageServiceClient = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = process.env.CHAT_SERVICE_URL || 'http://chat-service:3004/api/v1';
exports.messageServiceClient = {
    async getThreadById(id) {
        const res = await axios_1.default.get(`${BASE_URL}/threads/${id}`);
        return res.data;
    },
};
//# sourceMappingURL=message-service.client.js.map