import 'reflect-metadata';
import {
    Param,
    Body,
    Get,
    Post,
    Patch,
    Controller,
    Delete,
    HttpCode,
    UseBefore
} from 'routing-controllers';


import { IMessageService } from '../services/interfaces/IMessageService';
import { MessageService } from '../services/MessageService';
import authMiddleware from '../middlewares/auth';
import { CreateMessageDto } from '../dtos/createMessageDto';
import { IChatHistoryService } from '../services/interfaces/IChatHistoryService';
import { ChatHistoryService } from '../services/ChatHistoryService';


@Controller('/chat_history')
export class MessageController{

    _service: IChatHistoryService

    constructor()
    {
        this._service = new ChatHistoryService()
    }

    @UseBefore(authMiddleware)
    @Get("/")
    async getAllChatHistory()
    {
        return await this._service.getAll()
    }
}
