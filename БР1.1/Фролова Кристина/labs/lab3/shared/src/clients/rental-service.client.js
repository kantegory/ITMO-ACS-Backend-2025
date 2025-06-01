"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalServiceClient = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = process.env.RENTAL_SERVICE_URL || 'http://rental-service:3003/api/v1';
exports.rentalServiceClient = {
    async getRentalById(id) {
        const res = await axios_1.default.get(`${BASE_URL}/rentals/${id}`);
        return res.data;
    },
};
//# sourceMappingURL=rental-service.client.js.map