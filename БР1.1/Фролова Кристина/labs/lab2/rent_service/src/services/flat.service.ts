import dataSource from '../config/data-source';
import {FlatEntity} from "../entities/flat.entity";
import {LivingEntity} from "../entities/living.entity";
import {CreateFlatModel} from "../models/requests/flat/flat-create-request.model";

class FlatService {
    private repository = dataSource.getRepository(FlatEntity);

    async create(living: LivingEntity, model: CreateFlatModel): Promise<void> {
        const flat = this.repository.create({
            living,
            ...model,
        });
        await flat.save();
    }
}

export default new FlatService();
