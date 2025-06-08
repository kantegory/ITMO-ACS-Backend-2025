"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const repository_1 = require("../repository");
class PropertyController {
    static async all(request, response) {
        const data = await repository_1.propertyRepository.findAll();
        return response.status(200).send(data);
    }
    static async create(request, response) {
        const data = await repository_1.propertyRepository.createProperty(request.body);
        return response.status(201).send(data);
    }
    static async findOne(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.propertyRepository.findOne(id);
        return response.send(data);
    }
    static async update(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.propertyRepository.updateProperty(id, request.body);
        return response.send(data);
    }
    static async delete(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.propertyRepository.delete(id);
        return response.send(data);
    }
}
exports.PropertyController = PropertyController;
//# sourceMappingURL=PropertyController.js.map