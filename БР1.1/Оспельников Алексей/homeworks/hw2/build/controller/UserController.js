"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const repository_1 = require("../repository");
class UserController {
    static async all(request, response) {
        const data = await repository_1.userRepository.findAll();
        return response.status(200).send(data);
    }
    static async create(request, response) {
        const data = await repository_1.userRepository.createUser(request.body);
        return response.status(201).send(data);
    }
    static async findOne(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.userRepository.findOne(id);
        return response.send(data);
    }
    static async findByEmail(request, response) {
        const email = request.params.email;
        const data = await repository_1.userRepository.findByEmail(email);
        return response.send(data);
    }
    static async update(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.userRepository.updateUser(id, request.body);
        return response.send(data);
    }
    static async delete(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.userRepository.delete(id);
        return response.send(data);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map