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

import { Edge } from '../models/Edge';
import BaseController from './base';


@JsonController('/edges')
export class EdgesController extends BaseController {
    constructor()
    {
        super(Edge)
    }

    @Post('')
    async post(@Body() entity: Edge)
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
    async patch(@Param('id') id: number, entity: Edge)
    {
        return super.patch(id, entity);
    };

    @Delete('/:id')
    async delete(@Param('id') id: number)
    {
        return super.delete(id);
    };
}
