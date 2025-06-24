import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../models/message.entity';
import { Chat } from '../models/chat.entity';
import { User } from '../models/user.entity';
import { MessageService } from '../services/message.service';
import { MessageController } from '../controllers/message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat, User])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
