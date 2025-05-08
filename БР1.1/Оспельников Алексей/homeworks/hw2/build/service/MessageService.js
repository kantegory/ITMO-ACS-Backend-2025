"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
class MessageService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async findAll() {
        const messages = await this.messageRepository.find();
        return messages;
    }
    async findOne(id) {
        const messages = await this.messageRepository.findOne({ where: { id } });
        return messages;
    }
    async createMessage(newmessage) {
        const message = this.messageRepository.create(newmessage);
        await this.messageRepository.save(message);
        return message;
    }
    async updateMessage(id, data) {
        const message = await this.messageRepository.findOne({ where: { id } });
        if (message) {
            this.messageRepository.merge(message, data);
            await this.messageRepository.save(message);
            return message;
        }
        else {
            return { message: "Message not found" };
        }
    }
    async delete(id) {
        const message = await this.messageRepository.findOne({ where: { id } });
        if (message) {
            await this.messageRepository.remove(message);
            return { message: "Message Deleted successfully" };
        }
        else {
            return { message: "Message not found" };
        }
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=MessageService.js.map