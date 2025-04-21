import { ApiProperty } from '@nestjs/swagger';

export class CreatePsychologistDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  experience: number;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  price_per_hour: number;
}
