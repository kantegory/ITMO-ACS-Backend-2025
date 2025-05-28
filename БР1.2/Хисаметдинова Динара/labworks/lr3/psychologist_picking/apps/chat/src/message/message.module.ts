import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Chat } from '../chat/chat.entity';
import { User } from '../../../user/src/user/user.entity';
import { MessageService } from './message.service';
import { MessageController } from '../../../chat/src/message/message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat, User])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
