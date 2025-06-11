import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  user1Id: string;

  @ApiProperty()
  @IsString()
  user2Id: string;
}

export class MovieActionDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNumber()
  movieId: number;
}

export class SessionIdDto {
  @ApiProperty()
  @IsString()
  sessionId: string;
}
