import { Repository } from "typeorm";
import { Message } from "../entity/Message";

export class MessageService {
  constructor(private readonly messageRepository: Repository<Message>) {}
  async findAll() {
    const messages = await this.messageRepository.find();
    return messages;
  }
  async findOne(id: number) {
    const messages = await this.messageRepository.findOne({ where: { id } });
    return messages;
  }

  async createMessage(newmessage: Message) {
    const message = this.messageRepository.create(newmessage);
    await this.messageRepository.save(message);
    return message;
  }

  async updateMessage(id: number, data: Partial<Message>) {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (message) {
      this.messageRepository.merge(message, data);
      await this.messageRepository.save(message);
      return message;
    } else {
      return { message: "Message not found" };
    }
  }

  async delete(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });

    if (message) {
      await this.messageRepository.remove(message);
      return { message: "Message Deleted successfully" };
    } else {
      return { message: "Message not found" };
    }
  }

}