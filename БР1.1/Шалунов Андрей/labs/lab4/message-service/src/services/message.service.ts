import { AppDataSource } from '../config/data-source';
import { Message } from '../models/message.entity';
import { User } from '../models/user.entity';
import { Booking } from '../models/booking.entity';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';
import { fetchUser } from '../clients/user.client';
import { fetchBooking } from '../clients/booking.client';
import { NotFoundError } from 'routing-controllers';

const messageRepo = AppDataSource.getRepository(Message);
const userRepo = AppDataSource.getRepository(User);
const bookingRepo = AppDataSource.getRepository(Booking);

export class MessageService {
    static async createMessage(dto: CreateMessageDto, authHeader?: string) {
        const remoteSender = await fetchUser(dto.sender_id, authHeader);
        let sender = await userRepo.findOneBy({ user_id: dto.sender_id });
        if (!sender) {
        sender = userRepo.create({
            user_id: remoteSender.user_id,
            name: remoteSender.name,
            email: remoteSender.email,
            phone: remoteSender.phone ?? null
        });
        await userRepo.save(sender);
        }

        const remoteRecipient = await fetchUser(dto.recipient_id, authHeader);
        let recipient = await userRepo.findOneBy({ user_id: dto.recipient_id });
        if (!recipient) {
        recipient = userRepo.create({
            user_id: remoteRecipient.user_id,
            name: remoteRecipient.name,
            email: remoteRecipient.email,
            phone: remoteRecipient.phone ?? null
        });
        await userRepo.save(recipient);
        }

        const remoteBooking = await fetchBooking(dto.booking_id, authHeader);
        let booking = await bookingRepo.findOneBy({ booking_id: dto.booking_id });
        if (!booking) {
        booking = bookingRepo.create({
            booking_id: remoteBooking.booking_id,
            start_at: new Date(remoteBooking.start_at),
            end_at: new Date(remoteBooking.end_at),
            total_price: remoteBooking.total_price,
            deal_status: remoteBooking.deal_status
        });
        await bookingRepo.save(booking);
        }

        const message = messageRepo.create({
        sender,
        recipient,
        booking,
        text: dto.text
        });
        return messageRepo.save(message);
    }

    static getAllMessages() {
        return messageRepo.find({ relations: ['sender', 'recipient', 'booking'] });
    }

    static async getMessageById(id: number) {
        const m = await messageRepo.findOne({
        where: { message_id: id },
        relations: ['sender', 'recipient', 'booking']
        });
        if (!m) throw new NotFoundError('Message not found');
        return m;
    }

    static async updateMessage(id: number, dto: UpdateMessageDto) {
        await messageRepo.update({ message_id: id }, dto);
        return this.getMessageById(id);
    }

    static async deleteMessage(id: number) {
        const r = await messageRepo.delete({ message_id: id });
        if (r.affected === 0) throw new NotFoundError('Message not found');
    }
}