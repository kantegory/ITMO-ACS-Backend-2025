import 'reflect-metadata';
import {
    Get,
    Post,
    Patch,
    JsonController,
    Delete
} from 'routing-controllers';

import BaseController from './base';
import { EffectToCharacter } from '../models/EffectToCharacter';


@JsonController('/effectToCharacters')
export class EffectToCharactersController extends BaseController {
    constructor()
    {
        super(EffectToCharacter)
    }

    @Post('')
    async post(entity: EffectToCharacter)
    {
        return super.post(entity);
    };

    @Get('')
    async getAll()
    {
        return super.getAll()
    };

    @Get('/:id')
    async get(id: number)
    {
        return super.get(id)
    };

    @Patch('/:id')
    async patch(id: number, entity: EffectToCharacter)
    {
        return super.patch(id, entity);
    };

    @Delete('/:id')
    async delete(id: number)
    {
        return super.delete(id);
    };
}