import dataSource from '../config/data-source';
import {MessageEntity} from '../models/message.entity';
import {UserEntity} from '../models/user.entity';
import {AdvertisementEntity} from '../models/advertisement.entity';
import EntityNotFoundError from '../errors/entity-not-found.error';
import userService from "./user.service";
import advertisementService from "./advertisement.service";

class MessageService {
    private repository = dataSource.getRepository(MessageEntity);

    async getById(id: number) {
        const message = await this.repository.findOne({
            where: {id},
            relations: ['sender', 'receiver', 'advertisement'],
        });
        if (!message) throw new EntityNotFoundError(MessageEntity, id, "id");
        return message;
    }

    async getMessagesForAdvertisement(adId: number) {
        return await this.repository.find({
            where: {advertisement: {id: adId}},
            relations: ['sender', 'receiver'],
            order: {createdAt: 'ASC'},
        });
    }

    async create(newMessage: {
        senderId: number;
        receiverId: number;
        advertisementId: number;
        text: string;
    }) {
        const sender = await userService.getUserById(newMessage.senderId);
        const receiver = await userService.getUserById(newMessage.receiverId);
        const advertisement = await advertisementService.getAdvertisementById(newMessage.advertisementId);

        const message = this.repository.create({
            sender,
            receiver,
            advertisement,
            text: newMessage.text,
        });

        return await this.repository.save(message);
    }

    async delete(id: number) {
        await this.getById(id);
        return await this.repository.delete(id);
    }
}

export default new MessageService();
