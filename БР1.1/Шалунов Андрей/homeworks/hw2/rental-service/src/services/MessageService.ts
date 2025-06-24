import { dataSource } from '../DataSource';
import { Message } from '../models/Message';
import { CreateMessageDto, UpdateMessageDto } from '../dto/MessageDto';

const repo = dataSource.getRepository(Message);

export const createMessage = async (dto: CreateMessageDto) => {
    const { sender_id, recipient_id, booking_id, text } = dto;
    const entity = repo.create({
        text,
        sender:    { user_id: sender_id },
        recipient: { user_id: recipient_id },
        booking:   { booking_id },
    });
    return repo.save(entity);
};

export const getAllMessages = () =>
    repo.find({ relations: ['sender', 'recipient', 'booking'] });

export const getMessageById = (id: number) =>
    repo.findOne({
        where: { message_id: id },
        relations: ['sender', 'recipient', 'booking'],
    });

export const updateMessage = async (id: number, dto: UpdateMessageDto) => {
    await repo.update({ message_id: id }, dto);
    return getMessageById(id);
};

export const deleteMessage = (id: number) =>
    repo.delete({ message_id: id });