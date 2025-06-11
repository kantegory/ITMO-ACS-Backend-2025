import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { FriendRequestDto, FriendRequestIdDto } from './dto/friend.dto';
import { FriendRequest } from '../../entities/friend-request.entity';
import { Friendship } from '../../entities/friendship.entity';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('friends')
@Controller('friends')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('requests/send')
  @ApiOperation({ summary: 'Send a friend request' })
  @ApiResponse({ status: 201, description: 'Friend request sent.' })
  @ApiResponse({
    status: 409,
    description: 'Request already exists or already friends.',
  })
  async sendFriendRequest(
    @GetUser() user: { userId: string },
    @Body() dto: FriendRequestDto,
  ): Promise<FriendRequest> {
    return this.friendsService.sendFriendRequest(user.userId, dto.toUserId);
  }

  @Post('requests/:requestId/accept')
  @ApiOperation({ summary: 'Accept a friend request' })
  @ApiResponse({ status: 200, description: 'Accepted.' })
  @ApiResponse({ status: 404, description: 'Request not found.' })
  async acceptFriendRequest(
    @Param() params: FriendRequestIdDto,
  ): Promise<void> {
    return this.friendsService.acceptFriendRequest(params.requestId);
  }

  @Post('requests/:requestId/reject')
  @ApiOperation({ summary: 'Reject a friend request' })
  @ApiResponse({ status: 200, description: 'Rejected.' })
  @ApiResponse({ status: 404, description: 'Request not found.' })
  async rejectFriendRequest(
    @Param() params: FriendRequestIdDto,
  ): Promise<void> {
    return this.friendsService.rejectFriendRequest(params.requestId);
  }

  @Get('requests')
  @ApiOperation({ summary: 'Get all friend requests for current user' })
  @ApiResponse({ status: 200, description: 'List of friend requests.' })
  async getFriendRequests(
    @GetUser() user: { userId: string },
  ): Promise<FriendRequest[]> {
    return this.friendsService.getFriendRequests(user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all friends for current user' })
  @ApiResponse({ status: 200, description: 'List of friends.' })
  async getFriends(@GetUser() user: { userId: string }): Promise<Friendship[]> {
    return this.friendsService.getFriends(user.userId);
  }

  @Delete(':friendId')
  @ApiOperation({ summary: 'Remove a friend' })
  @ApiResponse({ status: 200, description: 'Friend removed.' })
  async removeFriend(
    @GetUser() user: { userId: string },
    @Param('friendId') friendId: string,
  ): Promise<void> {
    return this.friendsService.removeFriend(user.userId, friendId);
  }
}
