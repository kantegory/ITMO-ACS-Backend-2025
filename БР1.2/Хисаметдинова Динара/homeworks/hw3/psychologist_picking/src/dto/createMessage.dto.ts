import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 1, description: 'ID чата' })
  @IsInt()
  chatId: number;

  @ApiProperty({
    example: 'Здравствуйте, доктор!',
    description: 'Текст сообщения',
  })
  @IsString()
  message: string;
}
