import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { Chat } from '../chat/chat.entity';
import { User } from '../../../user/src/user/user.entity';
import { CreateMessageDto } from './createMessage.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateMessageDto, senderId: number) {
    const chat = await this.chatRepo.findOneByOrFail({ id: dto.chatId });
    const sender = await this.userRepo.findOneByOrFail({ id: senderId });

    // Можно проверить, что senderId — это либо sender, либо receiver в этом чате:
    if (chat.sender.id !== senderId && chat.receiver.id !== senderId) {
      throw new Error('Вы не участник этого чата');
    }

    const message = this.messageRepo.create({
      chat,
      sender,
      message: dto.message,
    });

    return this.messageRepo.save(message);
  }

  async findByChat(chatId: number) {
    return this.messageRepo.find({
      where: { chat: { id: chatId } },
      relations: ['sender'],
      order: { sent_at: 'ASC' },
    });
  }

  async findOne(id: number) {
    return this.messageRepo.findOne({
      where: { id },
      relations: ['sender', 'chat'],
    });
  }

  async remove(id: number, userId: number) {
    // Можно удалять только свои сообщения:
    const msg = await this.messageRepo.findOne({
      where: { id },
      relations: ['sender'],
    });
    if (!msg || msg.sender.id !== userId) {
      throw new Error('Можно удалять только свои сообщения');
    }
    return this.messageRepo.delete(id);
  }
}
