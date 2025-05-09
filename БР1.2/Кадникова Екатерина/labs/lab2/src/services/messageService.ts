import { AppDataSource } from "../data-source";
import { Message } from "../models/message";
import { Property } from "../models/property";
import { User } from "../models/user";
import { Role } from "../models/enums/role";
import { SendMessageDto, UpdateMessageDto } from "../dto/messageDto";

const messageRepo = AppDataSource.getRepository(Message);
const propertyRepo = AppDataSource.getRepository(Property);
const userRepo = AppDataSource.getRepository(User);

class MessageService {
    async getAllMessages(userId?: number) {
        if (!userId) throw new Error("Unauthorized");
        const user = await userRepo.findOneBy({ id: userId });
        if (!user || user.role !== Role.ADMIN) throw new Error("Forbidden");

        return messageRepo.find({
            relations: ['sender', 'receiver', 'property'],
            order: { sent_at: 'DESC' }
        });
    }

    async getMessageById(id: number, userId?: number) {
        if (!userId) throw new Error("Unauthorized");

        const message = await messageRepo.findOne({
            where: { id },
            relations: ['sender', 'receiver', 'property']
        });
        if (!message) throw new Error("Not found");

        const user = await userRepo.findOneBy({ id: userId });
        if (!user) throw new Error("User not found");

        const isParticipant = message.sender.id === userId || message.receiver.id === userId;
        if (!isParticipant && user.role !== Role.ADMIN) throw new Error("Forbidden");

        return message;
    }

    async sendMessage(dto: SendMessageDto, senderId?: number) {
        if (!senderId) throw new Error("Unauthorized");

        const property = await propertyRepo.findOneBy({ id: dto.propertyId });
        const receiver = await userRepo.findOneBy({ id: dto.receiverId });
        const sender = await userRepo.findOneBy({ id: senderId });

        if (!property || !receiver || !sender) {
            throw new Error("Missing required entities");
        }

        const message = messageRepo.create({
            sender,
            receiver,
            property,
            content: dto.content,
            sent_at: new Date(),
        });

        await messageRepo.save(message);
        return this.getMessageById(message.id, senderId);
    }

    async getUserDiscussions(userId?: number) {
        if (!userId) throw new Error("Unauthorized");
        if (isNaN(userId)) throw new Error("Invalid user ID");

        const messages = await messageRepo.find({
            where: [
                { sender: { id: userId } },
                { receiver: { id: userId } }
            ],
            relations: ['sender', 'receiver', 'property', 'property.owner'],
            order: { sent_at: 'DESC' }
        });

        const discussionsMap = new Map<string, any>();

        messages.forEach(message => {
            const isOwn = message.sender.id === userId;
            const participant = isOwn ? message.receiver : message.sender;
            const key = `${message.property.id}_${participant.id}`;

            if (!discussionsMap.has(key)) {
                discussionsMap.set(key, {
                    discussionId: key,
                    property: {
                        id: message.property.id,
                        title: message.property.title,
                    },
                    participant: {
                        id: participant.id,
                        username: participant.username,
                    },
                    lastMessage: {
                        content: message.content,
                        sent_at: message.sent_at,
                        isOwn
                    },
                    totalMessages: 1
                });
            } else {
                const discussion = discussionsMap.get(key);
                discussion.totalMessages++;
            }
        });

        return Array.from(discussionsMap.values())
            .sort((a, b) => b.lastMessage.sent_at.getTime() - a.lastMessage.sent_at.getTime());
    }

    async getPropertyMessages(propertyId: number, userId?: number) {
        if (!userId) throw new Error("Unauthorized");
        if (isNaN(propertyId)) throw new Error("Invalid property ID");

        const messages = await messageRepo.find({
            where: { property: { id: propertyId } },
            relations: ['sender', 'receiver', 'property']
        });

        const property = await propertyRepo.findOne({
            where: { id: propertyId },
            relations: ['owner']
        });

        if (!property) throw new Error("Property not found");

        const user = await userRepo.findOneBy({ id: userId });
        if (!user) throw new Error("User not found");

        const isOwner = property.owner.id === userId;
        const isParticipant = messages.some(m => m.sender.id === userId || m.receiver.id === userId);

        if (!isOwner && !isParticipant && user.role !== Role.ADMIN) {
            throw new Error("Forbidden");
        }

        return messages;
    }

    async updateMessage(id: number, dto: UpdateMessageDto, userId?: number) {
        if (!userId) throw new Error("Unauthorized");

        const message = await messageRepo.findOne({
            where: { id },
            relations: ['sender']
        });
        if (!message) throw new Error("Message not found");

        const user = await userRepo.findOneBy({ id: userId });
        if (!user) throw new Error("User not found");

        if (message.sender.id !== userId && user.role !== Role.ADMIN) {
            throw new Error("Forbidden");
        }

        const now = new Date();
        const sentAt = new Date(message.sent_at);
        const diff = now.getTime() - sentAt.getTime();

        if (diff > 60 * 60 * 1000) throw new Error("Message can be edited only within an hour after being sent");

        message.content = dto.content;
        await messageRepo.save(message);
        return this.getMessageById(id, userId);
    }

    async deleteMessage(id: number, userId?: number) {
        if (!userId) throw new Error("Unauthorized");

        const message = await messageRepo.findOne({
            where: { id },
            relations: ['sender', 'receiver']
        });
        if (!message) throw new Error("Message not found");

        const user = await userRepo.findOneBy({ id: userId });
        if (!user) throw new Error("User not found");

        const isSender = message.sender.id === userId;
        const isReceiver = message.receiver.id === userId;

        if (!isSender && !isReceiver && user.role !== Role.ADMIN) {
            throw new Error("Forbidden");
        }

        await messageRepo.remove(message);
    }
}

export default new MessageService();