import AppDataSource from "../config/AppDataSource";
import { ComfortEntity } from "../entities/comfort";
import EntityNotFoundError from "../errors/entity-not-found";
import { LivingEntity } from "../entities/living";

class ComfortService {
    private comfortRepo = AppDataSource.getRepository(ComfortEntity);

    async createComfort(data: Partial<ComfortEntity>) {
        const comfort = this.comfortRepo.create(data);
        return await this.comfortRepo.save(comfort);
    }

    async getComforts() {
        return await this.comfortRepo.find();
    }

    async getComfortById(id: number) {
        const comfort = await this.comfortRepo.findOne({ where: { id } });
        if (!comfort) {
            throw new EntityNotFoundError(ComfortEntity, id, "id");
        }
        return comfort;
    }

    async updateComfort(id: number, data: Partial<ComfortEntity>) {
        const comfort = await this.comfortRepo.findOne({ where: { id } });
        if (!comfort) {
            throw new EntityNotFoundError(ComfortEntity, id, "id");
        }
        Object.assign(comfort, data);
        return await this.comfortRepo.save(comfort);
    }

    async deleteComfort(id: number) {
        const result = await this.comfortRepo.delete(id);
        if (result.affected === 0) {
            throw new EntityNotFoundError(ComfortEntity, id, "id");
        }
        return { message: `Comfort with id ${id} deleted successfully` };
    }
}

export default new ComfortService();
