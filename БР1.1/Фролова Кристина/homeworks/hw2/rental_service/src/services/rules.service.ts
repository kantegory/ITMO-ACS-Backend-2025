import dataSource from '../config/data-source';
import { RulesEntity } from '../models/rules.entity';
import EntityNotFoundError from '../errors/entity-not-found.error';

class RulesService {
    private repository = dataSource.getRepository(RulesEntity);

    async getById(id: number) {
        const rules = await this.repository.findOneBy({ id });
        if (!rules) throw new EntityNotFoundError(RulesEntity, id, "id");
        return rules;
    }

    async create(data: Partial<RulesEntity>) {
        const rules = this.repository.create(data);
        return this.repository.save(rules);
    }

    async update(id: number, data: Partial<RulesEntity>) {
        await this.getById(id); // проверка
        return this.repository.update(id, data);
    }

    async delete(id: number) {
        await this.getById(id); // проверка
        return this.repository.delete(id);
    }
}

export default new RulesService();
