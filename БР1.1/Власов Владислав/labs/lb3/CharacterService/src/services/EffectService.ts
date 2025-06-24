import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial } from 'typeorm';

import dataSource from '../config/data-source';
import { Effect } from '../models/Effect';
import BaseCrudService from './BaseCrudService';
import { Condition } from '../models/Condition';
import { IEffectService } from './interfaces/IEffectService';
import { HttpError } from 'routing-controllers';

export class EffectService extends BaseCrudService implements IEffectService {

    constructor()
    {
        super(Effect)
    }

    async getConditions(effectId: number)
    {
        const effect = await this._repository.findOne({where: { id:effectId }, relations: ["conditions"]})
        if (!effect)
        {
            throw new HttpError(404, `${this._repository.metadata.name} not found!`);
        }
        return effect.conditions
    }
}