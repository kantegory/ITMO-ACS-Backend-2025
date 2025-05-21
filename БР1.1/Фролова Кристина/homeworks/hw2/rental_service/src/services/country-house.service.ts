import dataSource from '../config/data-source';
import { CountryHouseEntity } from '../models/country-house.entity';
import EntityNotFoundError from '../errors/entity-not-found.error';

class CountryHouseService {
    private repository = dataSource.getRepository(CountryHouseEntity);

    async getById(id: number) {
        const house = await this.repository.findOneBy({ id });
        if (!house) throw new EntityNotFoundError(CountryHouseEntity, id, "id");
        return house;
    }

    async create(data: Partial<CountryHouseEntity>) {
        const house = this.repository.create(data);
        return this.repository.save(house);
    }

    async update(id: number, data: Partial<CountryHouseEntity>) {
        await this.getById(id);
        return this.repository.update(id, data);
    }

    async delete(id: number) {
        await this.getById(id);
        return this.repository.delete(id);
    }
}

export default new CountryHouseService();
