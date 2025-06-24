import dataSource from "../config/data-source";
import {AdvertisementEntity} from "../models/advertisement.entity";
import EntityNotFoundError from "../errors/entity-not-found.error";

class AdvertisementService {

    private repository = dataSource.getRepository(AdvertisementEntity);

    async create(advertisement: Partial<AdvertisementEntity>) {
        return await this.repository.save(advertisement);
    }

    async getAdvertisementById(id: number) {
        const advertisement = await this.repository.findOneBy({id: id});
        if (!advertisement) {
            throw new EntityNotFoundError(AdvertisementEntity, id, "id");
        }
        return await this.repository.findOneBy({id: id});
    }

    async getAdvertisements() {
        return await this.repository.find();
    }

    async delete(id: number) {
        return await this.repository.delete(id);
    }

    async update(id: number, advertisement: Partial<AdvertisementEntity>) {
        const advertisementEntity = await this.getAdvertisementById(id);
        return await this.repository.update(id, advertisement);
    }
}

export default new AdvertisementService();