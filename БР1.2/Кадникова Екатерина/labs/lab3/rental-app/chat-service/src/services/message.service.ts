import { AppDataSource } from "../config/database";
import { Message } from "../models/message.entity";
import { SendMessageDto, UpdateMessageDto, Discussion } from "../dto/message.dto";
import userClient from "./user.client";
import propertyClient from "./property.client";
import { Request } from 'express';

export class MessageService {
    private messageRepository = AppDataSource.getRepository(Message);

    async getAllMessages(userId: number, req: Request) {
        const user = await userClient.getUserById(userId, req);
        if (user.role !== 'ADMIN') {
            throw new Error("Forbidden");
        }

        const messages = await this.messageRepository.find({ order: { sentAt: 'DESC' } });
        return this.enrichMessages(messages, req);
    }

    async getMessageById(id: number, userId: number, req: Request) {
        const message = await this.messageRepository.findOneBy({ id });
        if (!message) {
            throw new Error("Message not found");
        }

        const user = await userClient.getUserById(userId, req);
        const isParticipant = message.senderId === userId || message.receiverId === userId;

        if (!isParticipant && user.role !== 'ADMIN') {
            throw new Error("Forbidden");
        }

        return this.enrichMessage(message, req);
    }

    async sendMessage(dto: SendMessageDto, senderId: number, req: Request) {
        const [property, receiver, sender] = await Promise.all([
            propertyClient.getPropertyById(dto.propertyId, req),
            userClient.getUserById(dto.receiverId, req),
            userClient.getUserById(senderId, req)
        ]);

        if (!property || !receiver || !sender) {
            throw new Error("Missing required entities");
        }

        const message = this.messageRepository.create({
            senderId: sender.id,
            receiverId: receiver.id,
            propertyId: property.id,
            content: dto.content,
            sentAt: new Date(),
        });

        await this.messageRepository.save(message);
        return this.getMessageById(message.id, senderId, req);
    }

    async getUserDiscussions(userId: number, req: Request) {
        const messages = await this.messageRepository.find({
            where: [
                { senderId: userId },
                { receiverId: userId }
            ],
            order: { sentAt: 'DESC' }
        });

        const discussionsMap = new Map<string, Discussion>();

        for (const message of messages) {
            const isOwn = message.senderId === userId;
            const participantId = isOwn ? message.receiverId : message.senderId;
            const key = `${message.propertyId}_${participantId}`;

            if (!discussionsMap.has(key)) {
                const participant = await userClient.getUserById(participantId, req);
                const property = await propertyClient.getPropertyById(message.propertyId, req);

                discussionsMap.set(key, {
                    discussionId: key,
                    property: {
                        id: property.id,
                        title: property.title,
                    },
                    participant: {
                        id: participant.id,
                        username: participant.username,
                    },
                    lastMessage: {
                        content: message.content,
                        sentAt: message.sentAt,
                        isOwn
                    },
                    totalMessages: 1
                });
            } else {
                const discussion = discussionsMap.get(key)!;
                discussion.totalMessages++;
            }
        }

        return Array.from(discussionsMap.values())
            .sort((a, b) => b.lastMessage.sentAt.getTime() - a.lastMessage.sentAt.getTime());
    }

    async getPropertyMessages(propertyId: number, userId: number, req: Request) {
        const property = await propertyClient.getPropertyById(propertyId, req);
        const user = await userClient.getUserById(userId, req);

        const messages = await this.messageRepository.find({
            where: { propertyId },
            order: { sentAt: 'DESC' }
        });

        const isOwner = property.ownerId === userId;
        const isParticipant = messages.some(m => m.senderId === userId || m.receiverId === userId);

        if (!isOwner && !isParticipant && user.role !== 'ADMIN') {
            throw new Error("Forbidden");
        }

        return this.enrichMessages(messages, req);
    }

    async updateMessage(id: number, dto: UpdateMessageDto, userId: number, req: Request) {
        const message = await this.messageRepository.findOneBy({ id });
        if (!message) {
            throw new Error("Message not found");
        }

        const user = await userClient.getUserById(userId, req);
        if (message.senderId !== userId && user.role !== 'ADMIN') {
            throw new Error("Forbidden");
        }

        const now = new Date();
        const diff = now.getTime() - message.sentAt.getTime();

        if (diff > 60 * 60 * 1000) {
            throw new Error("Message can be edited only within an hour after being sent");
        }

        message.content = dto.content;
        await this.messageRepository.save(message);
        return this.getMessageById(id, userId, req);
    }

    async deleteMessage(id: number, userId: number, req: Request) {
        const message = await this.messageRepository.findOne({
            where: { id },
            relations: []
        });

        if (!message) {
            throw new Error("Message not found");
        }

        const user = await userClient.getUserById(userId, req);
        const isSender = message.senderId === userId;
        const isReceiver = message.receiverId === userId;

        if (!isSender && !isReceiver && user.role !== 'ADMIN') {
            throw new Error("Forbidden");
        }

        await this.messageRepository.remove(message);
    }

    private async enrichMessage(message: Message, req: Request) {
        const [sender, receiver, property] = await Promise.all([
            userClient.getUserById(message.senderId, req),
            userClient.getUserById(message.receiverId, req),
            propertyClient.getPropertyById(message.propertyId, req)
        ]);

        return {
            ...message,
            sender,
            receiver,
            property
        };
    }

    private async enrichMessages(messages: Message[], req: Request) {
        return Promise.all(messages.map(m => this.enrichMessage(m, req)));
    }
}

export default new MessageService();