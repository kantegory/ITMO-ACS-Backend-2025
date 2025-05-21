import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCommonDto } from 'src/common/dto/create-common.dto';

export class CreateUserDto extends CreateCommonDto {
  @IsString()
  @ApiProperty({ description: 'Имя' })
  name: string;
  @IsString()
  @ApiProperty({ description: 'Email' })
  email: string;
}
