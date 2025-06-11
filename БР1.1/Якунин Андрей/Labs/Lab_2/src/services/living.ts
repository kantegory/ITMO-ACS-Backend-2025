import AppDataSource from "../config/AppDataSource";
import EntityNotFoundError from "../errors/entity-not-found";
import { LivingEntity } from "../entities/living";
import {PropertyEntity} from "../entities/property";

class LivingService {
    private livingRepo = AppDataSource.getRepository(LivingEntity);

    async create(data: Partial<LivingEntity> & { propertyId: number }) {
        const propertyRepo = AppDataSource.getRepository(PropertyEntity);
        const property = await propertyRepo.findOneBy({ id: data.propertyId });
        if (!property) {
            throw new Error(`Property with id ${data.propertyId} not found`);
        }

        const entity = this.livingRepo.create({
            ...data,
            property,
        });

        return await this.livingRepo.save(entity);
    }
    async getLivings() {
        return await this.livingRepo.find();
    }

    async getLivingById(id: number) {
        const living = await this.livingRepo.findOne({ where: { id } });
        if (!living) {
            throw new EntityNotFoundError(LivingEntity, id, "id");
        }
        return living;
    }

    async delete(id: number) {
        const result = await this.livingRepo.delete(id);
        if (result.affected === 0) {
            throw new EntityNotFoundError(LivingEntity, id, "id");
        }
        return { message: `Living with id ${id} deleted successfully` };
    }

    async update(id: number, data: Partial<LivingEntity>) {
        const living = await this.livingRepo.findOne({ where: { id } });
        if (!living) {
            throw new EntityNotFoundError(LivingEntity, id, "id");
        }

        Object.assign(living, data);
        return await this.livingRepo.save(living);
    }
}

export default new LivingService();
