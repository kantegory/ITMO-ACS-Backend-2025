import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './createMessage.dto';
import { JwtAuthGuard } from '../../../../libs/shared/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../../../../libs/shared/decorators/user.decorator';
import { JwtPayload } from '../../../../libs/shared/types/jwt-payload.type';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() dto: CreateMessageDto, @User() user: JwtPayload) {
    return this.messageService.create(dto, user.sub);
  }

  @Get('chat/:chatId')
  getMessagesByChat(@Param('chatId') chatId: string) {
    return this.messageService.findByChat(+chatId);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: JwtPayload) {
    return this.messageService.remove(+id, user.sub);
  }
}
