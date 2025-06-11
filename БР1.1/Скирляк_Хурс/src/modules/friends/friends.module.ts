// src/modules/friends/friends.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from '../../entities/friend-request.entity';
import { Friendship } from '../../entities/friendship.entity';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest, Friendship])],
  providers: [FriendsService],
  controllers: [FriendsController],
})
export class FriendsModule {}
