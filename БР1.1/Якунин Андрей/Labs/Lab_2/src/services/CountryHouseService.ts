import AppDataSource from "../config/AppDataSource";
import { CountryHouseEntity } from "../entities/country-house";
import { LivingEntity } from "../entities/living";
import EntityNotFoundError from "../errors/entity-not-found";

class CountryHouseService {
    private repo = AppDataSource.getRepository(CountryHouseEntity);

    async createCountryHouse(data: Partial<CountryHouseEntity>) {
        const entity = this.repo.create(data);
        return await this.repo.save(entity);
    }

    async getCountryHouses() {
        return await this.repo.find({ relations: ["living"] });
    }

    async getCountryHouseById(id: number) {
        const house = await this.repo.findOne({ where: { id }, relations: ["living"] });
        if (!house) {
            throw new EntityNotFoundError(CountryHouseEntity, id, "id");
        }
        return house;
    }

    async updateCountryHouse(id: number, data: Partial<CountryHouseEntity>) {
        const house = await this.repo.findOne({ where: { id } });
        if (!house) {
            throw new EntityNotFoundError(CountryHouseEntity, id, "id");
        }
        Object.assign(house, data);
        return await this.repo.save(house);
    }

    async deleteCountryHouse(id: number) {
        const result = await this.repo.delete(id);
        if (result.affected === 0) {
            throw new EntityNotFoundError(CountryHouseEntity, id, "id");
        }
        return { message: `Country house with id ${id} deleted successfully` };
    }
}

export default new CountryHouseService();
