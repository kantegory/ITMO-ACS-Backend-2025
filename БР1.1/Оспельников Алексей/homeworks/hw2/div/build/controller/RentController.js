"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentController = void 0;
const repository_1 = require("../repository");
class RentController {
    static async all(request, response) {
        const data = await repository_1.rentRepository.findAll();
        return response.status(200).send(data);
    }
    static async create(request, response) {
        const data = await repository_1.rentRepository.createRent(request.body);
        return response.status(201).send(data);
    }
    static async findOne(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.rentRepository.findOne(id);
        return response.send(data);
    }
    static async update(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.rentRepository.updateRent(id, request.body);
        return response.send(data);
    }
    static async delete(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.rentRepository.delete(id);
        return response.send(data);
    }
}
exports.RentController = RentController;
//# sourceMappingURL=RentController.js.map