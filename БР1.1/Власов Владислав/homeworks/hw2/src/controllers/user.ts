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

import { User } from '../models/User';
import BaseController from './base';


@JsonController('/users')
export class UsersController extends BaseController {
    constructor()
    {
        super(User)
    }

    @Post('')
    async post(@Body() entity: User)
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

    @Get('/email/:email')
    async getByEmail(@Param('email') email: string)
    {   
        const user = await this.repository.findOneBy({ email })
        if (!user)
        {
            return {"message": "not found" }
        }
        return user
    }

    @Patch('/:id')
    async patch(@Param('id') id: number, entity: User)
    {
        return super.patch(id, entity);
    };

    @Delete('/:id')
    async delete(@Param('id') id: number)
    {
        return super.delete(id);
    };
}
