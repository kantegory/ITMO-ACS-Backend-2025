import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial } from 'typeorm';

import dataSource from '../config/data-source';
import BaseCrudService from './BaseCrudService';
import { Race } from '../models/Race';
import { IRaceService } from './interfaces/IRaceService';
import { ServicesValidator } from '../validators/ServicesValidator';
import { HttpError } from 'routing-controllers';
import { Edge } from '../models/Edge';

export class RaceService extends BaseCrudService implements IRaceService {

    _validator: ServicesValidator
    _edgeRepository: Repository<ObjectLiteral>
    constructor()
    {
        super(Race)
        this._validator = new ServicesValidator()
        this._edgeRepository = dataSource.getRepository(Edge)
    }

    async giveEdges(id: number, edgesId: number[]): Promise<void> {
        await this._validator.isEdgeExist(edgesId)

        const race: Race = await this._repository.findOne({
            where: { id },
            relations: ['edges'],
          }) as Race

        if (!race)
        {
            throw new HttpError(404, 'Race not found!');
        }
        
        for (const id of edgesId)
        {
            const edge = await this._edgeRepository.findOneBy({id}) as Edge
            race.edges.push(edge)
        }

        await this._repository.save(race)
    }

    async deleteEdges(id: number, edgesId: number[]): Promise<void> {
        await this._validator.isEdgeOfRace(id, edgesId)

        const race = await this._repository.findOne({
            where: {
                id: id
            },
            relations: {
                edges: true
            }
        }) as Race

        if (!race)
        {
            throw new HttpError(404, 'Race not found!');
        }
        
        race.edges = race.edges.filter((edge) => {
            return !edgesId.includes(edge.id)
        })
        
        await this._repository.save(race)
    }
}