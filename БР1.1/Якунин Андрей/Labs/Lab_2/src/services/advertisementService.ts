import AppDataSource from "../config/AppDataSource";
import  { AdvertisementEntity } from "../entities/advertisement";
import EntityNotFoundError from "../errors/entity-not-found";


class AdvertisementService {
    private advertisementRepo = AppDataSource.getRepository(AdvertisementEntity);

    async create(data: Partial<AdvertisementEntity>) {
        const entity = this.advertisementRepo.create(data);
        return await this.advertisementRepo.save(entity);
    }

    async getAdvertisements(){
        return await this.advertisementRepo.find();
    }

    async getAdvertisementById(id:number){
        return this.advertisementRepo.findOne({where:{id},  relations: ["owner", "category", "photos", "messages", "rules"]});
    }

    async deleteAdvertisement(id: number){
        return await this.advertisementRepo.delete(id);
    }

    async updateAdvertisement(id:number, advertisement: Partial<AdvertisementEntity>){
        const advertisementEntity = await this.getAdvertisementById(id);
        return await this.advertisementRepo.update(id, advertisement)
    }
}

export default new AdvertisementService();