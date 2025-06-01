import dataSource from '../config/data-source';
import {CountryHouseEntity} from "../entities/country-house.entity";
import {CreateCountryHouseModel} from "../models/requests/country-house/country-house-create-request.model";
import {LivingEntity} from "../entities/living.entity";

class CountryHouseService {
    private repository = dataSource.getRepository(CountryHouseEntity);

    async create(living: LivingEntity, model: CreateCountryHouseModel): Promise<void> {
        const house = this.repository.create({
            living,
            ...model,
        });
        await house.save();
    }
}

export default new CountryHouseService();
