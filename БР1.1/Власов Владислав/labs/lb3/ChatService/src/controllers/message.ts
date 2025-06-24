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
    UseBefore,
    Req
} from 'routing-controllers';


import { IMessageService } from '../services/interfaces/IMessageService';
import { MessageService } from '../services/MessageService';
import authMiddleware, { RequestWithUserId } from '../middlewares/auth';
import { CreateMessageDto } from '../dtos/createMessageDto';


@Controller('/messages')
export class MessageController{

    _service: IMessageService

    constructor()
    {
        this._service = new MessageService()
    }

    @UseBefore(authMiddleware)
    @Post("/create")
    @HttpCode(201)
    async createMessage(@Req() request: RequestWithUserId, @Body() message: CreateMessageDto)
    {
        return await this._service.post(request.userId, message)
    }

    @UseBefore(authMiddleware)
    @Get("/")
    async getAllMessage()
    {
        return await this._service.getAll()
    }

    @UseBefore(authMiddleware)
    @Get("/:id")
    async getMessage(@Param('id') id: number)
    {
        return await this._service.get(id)
    }
}
