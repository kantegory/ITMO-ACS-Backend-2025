import { AppDataSource } from '../config/data-source';
import { Message } from '../models/message.entity';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';

const messageRepo = AppDataSource.getRepository(Message);

export class MessageService {
    static createMessage(dto: CreateMessageDto) {
        const entity = messageRepo.create({
            text: dto.text,
            sender:    { user_id: dto.sender_id } as any,
            recipient: { user_id: dto.recipient_id } as any,
            booking:   { booking_id: dto.booking_id }   as any,
        });
        return messageRepo.save(entity);
    }

    static getAllMessages() {
        return messageRepo.find({ relations: ['sender', 'recipient', 'booking'] });
    }

    static getMessageById(id: number) {
        return messageRepo.findOne({
            where: { message_id: id },
            relations: ['sender', 'recipient', 'booking'],
        });
    }

    static async updateMessage(id: number, dto: UpdateMessageDto) {
        await messageRepo.update({ message_id: id }, dto);
        return this.getMessageById(id);
    }

    static deleteMessage(id: number) {
        return messageRepo.delete({ message_id: id });
    }
}