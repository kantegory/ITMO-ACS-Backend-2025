import 'reflect-metadata';
import {
    Param,
    Body,
    Get,
    Post,
    Patch,
    JsonController,
    Delete
} from 'routing-controllers';

import { Message } from '../models/Message';
import BaseController from './base';


@JsonController('/messages')
export class MessagesController extends BaseController {
    constructor()
    {
        super(Message)
    }

    @Post('')
    async post(@Body() entity: Message)
    {
        return super.post(entity);
    };

    @Get('')
    async getAll()
    {
        return super.getAll()
    };

    @Get('/:id')
    async get(@Param('id') id: number)
    {

        return super.get(id)
    };

    @Patch('/:id')
    async patch(@Param('id') id: number, entity: Message)
    {
        return super.patch(id, entity);
    };

    @Delete('/:id')
    async delete(@Param('id') id: number)
    {
        return super.delete(id);
    };
}
