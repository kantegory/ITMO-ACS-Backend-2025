import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FriendRequestDto {
  @IsString()
  @IsUUID()
  @ApiProperty()
  toUserId: string;
}

export class FriendRequestIdDto {
  @IsString()
  @IsUUID()
  @ApiProperty()
  requestId: string;
}

export class UserIdDto {
  @ApiProperty()
  @IsString()
  userId: string;
}
