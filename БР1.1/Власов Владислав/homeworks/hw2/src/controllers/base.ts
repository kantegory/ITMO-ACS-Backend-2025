import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial } from 'typeorm';

import dataSource from '../config/data-source';

abstract class BaseController {

    repository: Repository<ObjectLiteral>

    constructor(entity: EntityTarget<ObjectLiteral>)
    {
        this.repository = dataSource.getRepository(entity)
    }

    async post(entity: DeepPartial<ObjectLiteral>)
    {
        const createdEntity = this.repository.create(entity);
        const results = await this.repository.save(createdEntity);
        return results
    };

    async getAll()
    {
        return this.repository.find()
    };

    async get(id: number)
    {   
        const entity_db = await this.repository.findOneBy({ id })
        
        if (!entity_db)
        {
            return {"message": "not found" }
        }
        return entity_db
    };

    async patch(id: number, entity: DeepPartial<ObjectLiteral>)
    {
        const entityForUpdate = await this.repository.findOneBy({ id });
        Object.assign(entityForUpdate, entity);

        const results = await this.repository.save(entity);

        return results;
    };

    async delete(id: number)
    {
        const results = await this.repository.delete(id);
        return results;
    };
}

export default BaseController;