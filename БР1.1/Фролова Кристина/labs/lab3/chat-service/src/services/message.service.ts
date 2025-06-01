import dataSource from '../config/data-source';
import {MessageEntity} from "../entities/message.entity";
import {Message} from "../models/models/message.model";
import {CreateMessageModel} from "../models/requests/message-create.model";
import {toMessage} from "../mappers/message.mapper";
import {advertisementServiceClient, EntityNotFoundError, userServiceClient} from "@rent/shared";

class MessageService {
    private repository = dataSource.getRepository(MessageEntity);

    async getById(id: number): Promise<Message> {
        const message = await this.repository.findOne({
            where: {id}
        });
        if (!message) throw new EntityNotFoundError(MessageEntity, id, "id");
        return message;
    }

    async getMessagesForAdvertisement(advertisementId: number): Promise<Message[]> {
        const messages = await this.repository.find({
            where: {advertisementId: advertisementId },
            order: {createdAt: 'ASC'},
        });
        return messages.map(toMessage);
    }

    async create(newMessage: CreateMessageModel): Promise<Message> {

        const message = await this.repository.save({
            senderId: newMessage.senderId,
            receiverId: newMessage.receiverId,
            advertisementId: newMessage.advertisementId,
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
