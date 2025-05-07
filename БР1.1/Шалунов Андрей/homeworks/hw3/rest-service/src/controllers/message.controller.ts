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
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';
import { MessageService } from '../services/message.service';
import { authMiddleware } from '../middlewares/auth.middleware';

@JsonController('/messages')
@UseBefore(authMiddleware)
export class MessageController {
    @Post('/')
    @HttpCode(201)
    @OpenAPI({ summary: 'Send message' })
    @ResponseSchema(CreateMessageDto, { statusCode: 201 })
    async create(@Body() dto: CreateMessageDto) {
        return MessageService.createMessage(dto);
    }

    @Get('/')
    @OpenAPI({ summary: 'Get all messages' })
    @ResponseSchema(CreateMessageDto, { isArray: true })
    async findAll() {
        return MessageService.getAllMessages();
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Get message by id' })
    @ResponseSchema(CreateMessageDto)
    async findOne(@Param('id') id: number) {
        const m = await MessageService.getMessageById(id);
        if (!m) throw { status: 404, message: 'Message not found' };
        return m;
    }

    @Put('/:id')
    @OpenAPI({ summary: 'Update message' })
    @ResponseSchema(UpdateMessageDto)
    async update(@Param('id') id: number, @Body() dto: UpdateMessageDto) {
        return MessageService.updateMessage(id, dto);
    }

    @Delete('/:id')
    @HttpCode(204)
    @OpenAPI({ summary: 'Delete message' })
    async remove(@Param('id') id: number) {
        await MessageService.deleteMessage(id);
    }
}  