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

import { Effect } from '../models/Effect';
import BaseController from './base';


@JsonController('/effectss')
export class EffectsController extends BaseController {
    constructor()
    {
        super(Effect)
    }

    @Post('')
    async post(@Body() entity: Effect)
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
    async patch(@Param('id') id: number, entity: Effect)
    {
        return super.patch(id, entity);
    };

    @Delete('/:id')
    async delete(@Param('id') id: number)
    {
        return super.delete(id);
    };
}
