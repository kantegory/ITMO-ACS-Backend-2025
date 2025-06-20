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

import { Item } from '../models/Item';
import BaseController from './base';


@JsonController('/items')
export class ItemsController extends BaseController {
    constructor()
    {
        super(Item)
    }

    @Post('')
    async post(@Body() entity: Item)
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
    async patch(@Param('id') id: number, entity: Item)
    {
        return super.patch(id, entity);
    };

    @Delete('/:id')
    async delete(@Param('id') id: number)
    {
        return super.delete(id);
    };
}
