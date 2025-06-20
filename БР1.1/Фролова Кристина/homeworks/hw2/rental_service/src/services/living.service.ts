import dataSource from '../config/data-source';
import { LivingEntity } from '../models/living.entity';
import EntityNotFoundError from '../errors/entity-not-found.error';

class LivingService {
    private repository = dataSource.getRepository(LivingEntity);

    async getById(id: number) {
        const living = await this.repository.findOne({
            where: { id },
            relations: ['comfort', 'room', 'flat', 'countryHouse'], // если нужно
        });

        if (!living) throw new EntityNotFoundError(LivingEntity, id, "id");
        return living;
    }

    async getAll() {
        return await this.repository.find({
            relations: ['comfort', 'room', 'flat', 'countryHouse'], // опционально
        });
    }

    async create(data: Partial<LivingEntity>) {
        const living = this.repository.create(data);
        return await this.repository.save(living);
    }

    async update(id: number, data: Partial<LivingEntity>) {
        await this.getById(id); // проверка наличия
        await this.repository.update(id, data);
        return this.getById(id); // возвращаем обновлённый объект
    }

    async delete(id: number) {
        await this.getById(id); // проверка наличия
        return this.repository.delete(id);
    }
}

export default new LivingService();
