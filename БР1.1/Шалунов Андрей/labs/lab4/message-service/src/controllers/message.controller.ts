import {
    JsonController,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    UseBefore,
    Req
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';
import { MessageService } from '../services/message.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@JsonController()
@UseBefore(AuthMiddleware)
export class MessageController {
    @Post('/')
    @HttpCode(201)
    @OpenAPI({ summary: 'Send message' })
    @ResponseSchema(CreateMessageDto, { statusCode: 201 })
    async create(@Body() dto: CreateMessageDto, @Req() req: any) {
        return MessageService.createMessage(dto, req.header('Authorization'));
    }

    @Get('/')
    @OpenAPI({ summary: 'Get all messages' })
    @ResponseSchema(CreateMessageDto, { isArray: true })
    findAll() {
        return MessageService.getAllMessages();
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Get message by id' })
    @ResponseSchema(CreateMessageDto)
    findOne(@Param('id') id: number) {
        return MessageService.getMessageById(id);
    }

    @Put('/:id')
    @OpenAPI({ summary: 'Update message' })
    @ResponseSchema(UpdateMessageDto)
    update(@Param('id') id: number, @Body() dto: UpdateMessageDto) {
        return MessageService.updateMessage(id, dto);
    }

    @Delete('/:id')
    @HttpCode(204)
    @OpenAPI({ summary: 'Delete message' })
    remove(@Param('id') id: number) {
        return MessageService.deleteMessage(id);
    }
}