import AppDataSource from "../config/AppDataSource";
import { FlatEntity} from "../entities/flat";
import EntityNotFoundError from "../errors/entity-not-found";
import {LivingEntity} from "../entities/living";

class FlatService {
    private flatRepo = AppDataSource.getRepository(FlatEntity);

    async createFlat(data: Partial<FlatEntity>){
        const entity = this.flatRepo.create(data);
        return await this.flatRepo.save(data)
    }

    async getFlats(){
        return await this.flatRepo.find();
    }

    async getFlatsById(id: number){
        const flat = await this.flatRepo.findOne({where: {id}});
        if (!flat){
            throw new EntityNotFoundError(FlatEntity, id, "id");
        }
        return flat;
    }

    async deleteFlat(id: number){
        const result = await this.flatRepo.delete(id);
        if (result.affected === 0) {
            throw new EntityNotFoundError(FlatEntity, id, "id");
        }
        return { message: `Flat with id ${id} deleted successfully` };
    }

    async updateFlat(id: number, data: Partial<FlatEntity>){
        const flat =  await this.flatRepo.findOne({where: {id}});
        if (!flat) {
            throw new EntityNotFoundError(LivingEntity, id, "id");
        }
        Object.assign(flat, data);
        return await this.flatRepo.save(flat);
    }
}

export default new FlatService();