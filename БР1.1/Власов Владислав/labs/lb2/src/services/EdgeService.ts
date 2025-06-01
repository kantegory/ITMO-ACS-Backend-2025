import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial } from 'typeorm';

import dataSource from '../config/data-source';
import BaseCrudService from './BaseCrudService';
import { Edge } from '../models/Edge';
import { IEdgeService } from './interfaces/IEdgeService';
import { ServicesValidator } from '../validators/ServicesValidator';
import { HttpError } from 'routing-controllers';
import { Effect } from '../models/Effect';

export class EdgeService extends BaseCrudService implements IEdgeService {

    _validator: ServicesValidator
    _effectRepository: Repository<ObjectLiteral>
    constructor()
    {
        super(Edge)
        this._validator = new ServicesValidator()
        this._effectRepository = dataSource.getRepository(Effect)
    }

    async giveEffects(id: number, effectsId: number[]): Promise<void> {
        await this._validator.isEffectExist(effectsId)

        const edge: Edge = await this._repository.findOne({
            where: { id },
            relations: ['effects'],
          }) as Edge

        if (!edge)
        {
            throw new HttpError(404, 'Edge not found!');
        }
        
        for (const id of effectsId)
        {
            const effect = await this._effectRepository.findOneBy({id}) as Effect
            edge.effects.push(effect)
        }

        await this._repository.save(edge)
    }

    async deleteEffects(id: number, effectsId: number[]): Promise<void> {
        await this._validator.isEffectOfEdge(id, effectsId)

        const edge = await this._repository.findOne({
            where: {
                id: id
            },
            relations: {
                effects: true
            }
        }) as Edge

        if (!edge)
        {
            throw new HttpError(404, 'Edge not found!');
        }
        
        edge.effects = edge.effects.filter((effect) => {
            return !effectsId.includes(effect.id)
        })
        
        await this._repository.save(edge)
    }
}