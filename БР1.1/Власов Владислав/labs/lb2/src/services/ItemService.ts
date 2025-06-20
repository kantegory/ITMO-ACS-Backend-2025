import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial } from 'typeorm';

import dataSource from '../config/data-source';
import BaseCrudService from './BaseCrudService';
import { Item } from '../models/Item';
import { IItemService } from './interfaces/IItemService';
import { ServicesValidator } from '../validators/ServicesValidator';
import { HttpError } from 'routing-controllers';
import { Effect } from '../models/Effect';

export class ItemService extends BaseCrudService implements IItemService {

    _validator: ServicesValidator
    _effectRepository: Repository<ObjectLiteral>
    constructor()
    {
        super(Item)
        this._validator = new ServicesValidator()
        this._effectRepository = dataSource.getRepository(Effect)
    }

    async giveEffects(id: number, effectsId: number[]): Promise<void> {
        await this._validator.isEffectExist(effectsId)

        const item: Item = await this._repository.findOne({
            where: { id },
            relations: ['effects'],
          }) as Item

        if (!item)
        {
            throw new HttpError(404, 'Item not found!');
        }

        for (const effectId of effectsId)
        {
            const effect = await this._effectRepository.findOneBy({id:effectId}) as Effect
            item.effects.push(effect)
        }

        await this._repository.save(item)
    }

    async deleteEffects(id: number, effectsId: number[]): Promise<void> {
        await this._validator.isEffectOfItem(id, effectsId)

        const item = await this._repository.findOne({
            where: {
                id: id
            },
            relations: {
                effects: true
            }
        }) as Item

        if (!item)
        {
            throw new HttpError(404, 'Item not found!');
        }
        
        item.effects = item.effects.filter((effect) => {
            return !effectsId.includes(effect.id)
        })

        console.log(item)
        
        await this._repository.save(item)
    }
}