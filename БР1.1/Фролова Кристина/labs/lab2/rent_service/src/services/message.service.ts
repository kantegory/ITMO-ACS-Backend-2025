import dataSource from '../config/data-source';
import EntityNotFoundError from '../errors/entity-not-found.error';
import userService from "./user.service";
import advertisementService from "./advertisement.service";
import {MessageEntity} from "../entities/message.entity";
import {Message} from "../models/models/message.model";
import {toMessage} from "../mappers/message.mapper";
import {CreateMessageModel} from "../models/requests/message/message-create.model";

class MessageService {
    private repository = dataSource.getRepository(MessageEntity);

    async getById(id: number): Promise<Message> {
        const message = await this.repository.findOne({
            where: {id},
            relations: ['sender', 'receiver', 'advertisement'],
        });
        if (!message) throw new EntityNotFoundError(MessageEntity, id, "id");
        return message;
    }

    async getMessagesForAdvertisement(advertisementId: number): Promise<Message[]> {
        const messages = await this.repository.find({
            where: {advertisement: {id: advertisementId}},
            relations: ['sender', 'receiver'],
            order: {createdAt: 'ASC'},
        });
        return messages.map(toMessage);
    }

    async create(newMessage: CreateMessageModel): Promise<Message> {
        const sender = await userService.getUserById(newMessage.senderId);
        const receiver = await userService.getUserById(newMessage.receiverId);
        const advertisement = await advertisementService.getById(newMessage.advertisementId);

        const message = await this.repository.save({
            sender,
            receiver,
            advertisement,
            text: newMessage.text,
        });

        return toMessage(message);
    }

    async delete(id: number) {
        await this.getById(id);
        return await this.repository.delete(id);
    }
}

export default new MessageService();
