"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertisementServiceClient = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = process.env.AD_SERVICE_URL || 'http://advertisement-service:3002/api/v1';
exports.advertisementServiceClient = {
    async getAdById(id) {
        const res = await axios_1.default.get(`${BASE_URL}/ads/${id}`);
        return res.data;
    },
};
//# sourceMappingURL=advertisement-service.client.js.map