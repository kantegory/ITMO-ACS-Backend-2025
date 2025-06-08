"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const repository_1 = require("../repository");
class MessageController {
    static async all(request, response) {
        const data = await repository_1.messageRepository.findAll();
        return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }
    static async create(request, response) {
        const data = await repository_1.messageRepository.createMessage(request.body);
        return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }
    static async findOne(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.messageRepository.findOne(id);
        return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }
    static async update(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.messageRepository.updateMessage(id, request.body);
        return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }
    static async delete(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.messageRepository.delete(id);
        return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }
}
exports.MessageController = MessageController;
//# sourceMappingURL=MessageController.js.map