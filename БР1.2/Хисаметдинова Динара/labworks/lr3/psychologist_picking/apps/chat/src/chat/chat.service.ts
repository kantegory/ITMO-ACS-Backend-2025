import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository } from 'typeorm';
import { User } from '../../../user/src/user/user.entity';
import { CreateChatDto } from './createChat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateChatDto) {
    const sender = await this.userRepo.findOneByOrFail({ id: dto.senderId });
    const receiver = await this.userRepo.findOneByOrFail({
      id: dto.receiverId,
    });
    const chat = this.chatRepo.create({ sender, receiver });
    return this.chatRepo.save(chat);
  }

  findAll() {
    return this.chatRepo.find({ relations: ['sender', 'receiver'] });
  }

  findOne(id: number) {
    return this.chatRepo.findOne({
      where: { id },
      relations: ['sender', 'receiver'],
    });
  }

  remove(id: number) {
    return this.chatRepo.delete(id);
  }
}
