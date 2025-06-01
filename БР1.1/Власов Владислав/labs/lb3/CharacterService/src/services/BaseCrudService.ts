import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial } from 'typeorm';

import dataSource from '../config/data-source';
import { HttpError } from 'routing-controllers';
import { IBaseCrudService } from './interfaces/IBaseCrudService';

abstract class BaseCrudService implements IBaseCrudService {

    _repository: Repository<ObjectLiteral>

    constructor(entity: EntityTarget<ObjectLiteral>)
    {
        this._repository = dataSource.getRepository(entity)
    }

    async post(entity: DeepPartial<ObjectLiteral>)
    {
        const createdEntity = this._repository.create(entity);
        const results = await this._repository.save(createdEntity);
        return results
    };

    async getAll()
    {
        return this._repository.find()
    };

    async get(id: number)
    {   
        const entity_db = await this._repository.findOneBy({ id })
        if (!entity_db)
        {
            throw new HttpError(404, `${this._repository.metadata.name} not found!`);
        }

        return entity_db
    };

    async patch(id: number, entity: DeepPartial<ObjectLiteral>)
    {
        const entityForUpdate = await this._repository.findOneBy({ id });
        if (!entityForUpdate)
        {
            throw new HttpError(404, `${this._repository.metadata.name} not found!`);
        }

        Object.assign(entityForUpdate, entity);

        const results = await this._repository.save(entityForUpdate);

        return results;
    };

    async delete(id: number)
    {
        const entity_db = await this._repository.findOneBy({ id })
        if (!entity_db)
        {
            throw new HttpError(404, `${this._repository.metadata.name} not found!`);
        }

        const results = await this._repository.delete(id);
        return results;
    };
}

export default BaseCrudService;