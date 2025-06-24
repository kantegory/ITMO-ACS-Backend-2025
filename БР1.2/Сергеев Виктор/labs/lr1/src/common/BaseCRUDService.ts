import { DeepPartial } from "typeorm";
import { BaseService } from "./BaseService";

export class BaseCRUDService<T> extends BaseService<T> {
    constructor (model: new() => T) {
        super(model);
    }

    getAllEntities = async(): Promise<Array<T>> => {
        return this.repository.find();
    }
    
    getEntityById = async (id: number): Promise<T | null> => {
        return this.repository.findOneBy({id: id} as any);
    }

    createEntity = async (data: DeepPartial<T>): Promise<T> => {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    updateEntity = async (id: number, data: DeepPartial<T>): Promise<T> => {
        const entity = await this.getEntityById(id);
        if (!entity) {
            return null;
        }
        this.repository.merge(entity, data);
        return this.repository.save(entity);
    }

    deleteEntity = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}