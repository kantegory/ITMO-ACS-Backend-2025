"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const repository_1 = require("../repository");
class PropertyController {
    static async all(request, response) {
        const data = await repository_1.propertyRepository.findAll();
        return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }
    static async create(request, response) {
        const data = await repository_1.propertyRepository.createProperty(request.body);
        return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }
    static async findOne(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.propertyRepository.findOne(id);
        return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }
    static async update(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.propertyRepository.updateProperty(id, request.body);
        return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }
    static async delete(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.propertyRepository.delete(id);
        return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }
}
exports.PropertyController = PropertyController;
//# sourceMappingURL=PropertyController.js.map