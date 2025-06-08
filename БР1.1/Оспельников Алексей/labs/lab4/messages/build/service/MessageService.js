"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
class MessageService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async findAll() {
        const message = await this.messageRepository.find();
        return { 'status': 200, 'data': message, message: "Messages found" };
    }
    async findOne(id) {
        const message = await this.messageRepository.findOne({ where: { id } });
        if (!message) {
            return { 'status': 404, 'data': null, message: "Message not found" };
        }
        return { 'status': 200, 'data': message, message: "Message found" };
    }
    async findChatHistory(first_id, second_id) {
        const messages = await this.messageRepository.find({
            where: [
                { sender_id: first_id, recipient_id: second_id },
                { sender_id: second_id, recipient_id: first_id },
            ],
            order: {
                created_at: "ASC",
            },
        });
        if (!messages || messages.length === 0) {
            return { 'status': 404, 'data': null, message: "No messages found in chat history" };
        }
        return { 'status': 200, 'data': messages, message: "Chat history found" };
    }
    async createMessage(newmessage) {
        try {
            const message = this.messageRepository.create(newmessage);
            const savedMessage = await this.messageRepository.save(message);
            return { 'status': 201, 'data': savedMessage, 'message': 'Successfully created' };
        }
        catch (error) {
            return { 'status': 500, 'data': null, 'message': 'Wrong Parameters' };
        }
    }
    async updateMessage(id, data) {
        const message = await this.messageRepository.findOne({ where: { id } });
        if (message) {
            try {
                this.messageRepository.merge(message, data);
                const savedMessage = await this.messageRepository.save(message);
                return { 'status': 200, 'data': savedMessage, message: 'Successfully updated' };
            }
            catch (error) {
                return { 'status': 500, 'data': null, message: 'Wrong Parameters' };
            }
        }
        else {
            return { 'status': 404, 'data': null, message: "Message not found" };
        }
    }
    async delete(id) {
        const message = await this.messageRepository.findOne({ where: { id } });
        if (message) {
            await this.messageRepository.remove(message);
            return { 'status': 200, 'message': "Message Deleted successfully" };
        }
        else {
            return { 'status': 404, 'message': "Message not found" };
        }
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=MessageService.js.map