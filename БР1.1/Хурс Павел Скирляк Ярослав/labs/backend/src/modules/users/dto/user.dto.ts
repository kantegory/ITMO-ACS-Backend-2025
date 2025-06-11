import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Group, MovieMatch } from '../../..//entities';

export class UserIdDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  userId: string;
}

export class UserProfileDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  nickname?: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  created_at: Date;

  @ApiProperty()
  @IsString()
  updated_at: Date;

  @ApiProperty({ type: [MovieMatch], required: false })
  matchesAsUser1?: MovieMatch[];

  @ApiProperty({ type: [MovieMatch], required: false })
  matchesAsUser2?: MovieMatch[];

  @ApiProperty({ type: Group, required: false })
  group?: Group;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  group_id?: string;
  // is_2fa_enabled?: boolean;
  // google_2fa_secret?: string;
}
