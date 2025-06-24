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

import { Race } from '../models/Race';
import BaseController from './base';


@JsonController('/races')
export class RacesController extends BaseController {
    constructor()
    {
        super(Race)
    }

    @Post('')
    async post(@Body() entity: Race)
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
    async patch(@Param('id') id: number, entity: Race)
    {
        return super.patch(id, entity);
    };

    @Delete('/:id')
    async delete(@Param('id') id: number)
    {
        return super.delete(id);
    };
}
