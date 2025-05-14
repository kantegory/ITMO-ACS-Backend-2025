import { Repository } from "typeorm";
import { Message } from "../entity/Message";

export class MessageService {
  constructor(private readonly messageRepository: Repository<Message>) {}
  async findAll() {
    const message = await this.messageRepository.find();
    return { 'status': 200, 'data': message, message: "Messages found"  };
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      return { 'status': 404, 'data': null, message: "Message not found" }
    }
    return { 'status': 200, 'data': message, message: "Message found" };
  }

  async createMessage(newmessage: Message) {
    try {
        const message = this.messageRepository.create(newmessage);
        const savedMessage = await this.messageRepository.save(message);
        return { 'status': 201, 'data': savedMessage, 'message': 'Successfully created' };
    } 
    catch (error) {
        return { 'status': 500, 'data': null, 'message': 'Wrong Parameters' };
    }
  }

  async updateMessage(id: number, data: Partial<Message>) {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (message) {
      try {
        this.messageRepository.merge(message, data);
        const savedMessage = await this.messageRepository.save(message);
        return { 'status': 201, 'data': savedMessage, message: 'Successfully updated' };
      } 
      catch (error) {
        return { 'status': 500, 'data': null, message: 'Wrong Parameters' };
      }
    } else {
      return { 'status': 404, 'data': null, message: "Message not found" };
    }
  }

  async delete(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });

    if (message) {
      await this.messageRepository.remove(message);
      return { 'status': 204, 'message': "Message Deleted successfully" };
    } else {
      return { 'status': 404, 'message': "Message not found" };
    }
  }

}