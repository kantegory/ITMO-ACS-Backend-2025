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

import { SkillToCharacter } from '../models/SkillToCharacter';
import BaseController from './base';


@JsonController('/skillToCharacters')
export class SkillToCharactersController extends BaseController {
    constructor()
    {
        super(SkillToCharacter)
    }

    @Post('')
    async post(@Body() entity: SkillToCharacter)
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
    async patch(@Param('id') id: number, entity: SkillToCharacter)
    {
        return super.patch(id, entity);
    };

    @Delete('/:id')
    async delete(@Param('id') id: number)
    {
        return super.delete(id);
    };
}
