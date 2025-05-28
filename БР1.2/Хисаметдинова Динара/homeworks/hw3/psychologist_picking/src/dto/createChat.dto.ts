import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ example: 1 })
  senderId: number;

  @ApiProperty({ example: 2 })
  receiverId: number;
}
