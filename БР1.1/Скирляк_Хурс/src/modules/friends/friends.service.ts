import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FriendRequest } from '../../entities/friend-request.entity';
import { Friendship } from '../../entities/friendship.entity';

import { Repository } from 'typeorm';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(Friendship)
    private readonly friendshipRepository: Repository<Friendship>,
  ) {}

  async sendFriendRequest(
    fromUserId: string,
    toUserId: string,
  ): Promise<FriendRequest> {
    // Check if request already exists
    const existingRequest = await this.friendRequestRepository.findOne({
      where: [
        { from_user_id: fromUserId, to_user_id: toUserId },
        { from_user_id: toUserId, to_user_id: fromUserId },
      ],
    });

    if (existingRequest) {
      throw new ConflictException('Friend request already exists');
    }

    // Check if they are already friends
    const existingFriendship = await this.friendshipRepository.findOne({
      where: [
        { user_id: fromUserId, friend_id: toUserId },
        { user_id: toUserId, friend_id: fromUserId },
      ],
    });

    if (existingFriendship) {
      throw new ConflictException('Users are already friends');
    }

    const friendRequest = this.friendRequestRepository.create({
      from_user_id: fromUserId,
      to_user_id: toUserId,
    });

    return this.friendRequestRepository.save(friendRequest);
  }

  async acceptFriendRequest(requestId: string): Promise<void> {
    const request = await this.friendRequestRepository.findOne({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Friend request not found');
    }

    // Create mutual friendship records
    await this.friendshipRepository.save([
      {
        user_id: request.from_user_id,
        friend_id: request.to_user_id,
      },
      {
        user_id: request.to_user_id,
        friend_id: request.from_user_id,
      },
    ]);

    // Delete the friend request
    await this.friendRequestRepository.remove(request);
  }

  async rejectFriendRequest(requestId: string): Promise<void> {
    const request = await this.friendRequestRepository.findOne({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Friend request not found');
    }

    await this.friendRequestRepository.remove(request);
  }

  async getFriendRequests(userId: string): Promise<FriendRequest[]> {
    return this.friendRequestRepository.find({
      where: [{ to_user_id: userId }, { from_user_id: userId }],
      relations: ['from_user', 'to_user'],
    });
  }

  async getFriends(userId: string): Promise<Friendship[]> {
    return this.friendshipRepository.find({
      where: { user_id: userId },
      relations: ['friend'],
    });
  }

  async removeFriend(userId: string, friendId: string): Promise<void> {
    await this.friendshipRepository.delete([
      { user_id: userId, friend_id: friendId },
      { user_id: friendId, friend_id: userId },
    ]);
  }
}
