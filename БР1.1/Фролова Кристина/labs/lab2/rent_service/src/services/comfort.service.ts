import dataSource from '../config/data-source';
import EntityNotFoundError from '../errors/entity-not-found.error';
import {ComfortEntity} from "../entities/comfort.entity";
import {CreateComfortModel} from "../models/requests/comfort/create-comfort-request.model";
import {LivingEntity} from "../entities/living.entity";

class ComfortService {
    private repository = dataSource.getRepository(ComfortEntity);

    async create(living: LivingEntity, model: CreateComfortModel): Promise<void> {
        const comfort = this.repository.create({
            living,
            ...model,
        });
        await comfort.save();
    }
}

export default new ComfortService();
