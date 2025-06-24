import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '../models/chat.entity';
import { User } from '../models/user.entity';
import { ChatService } from '../services/chat.service';
import { ChatController } from '../controllers/chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
