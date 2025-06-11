import AppDataSource from "../config/AppDataSource";
import { RulesEntity } from "../entities/rules";
import EntityNotFoundError from "../errors/entity-not-found";

class RulesService {
    private rulesRepo = AppDataSource.getRepository(RulesEntity);

    async createRule(data: Partial<RulesEntity>) {
        const rule = this.rulesRepo.create(data);
        return await this.rulesRepo.save(rule);
    }

    async getAllRules() {
        return await this.rulesRepo.find({ relations: ["advertisement"] });
    }

    async getRulesById(id: number) {
        const rule = await this.rulesRepo.findOne({ where: { id }, relations: ["advertisement"] });
        if (!rule) {
            throw new EntityNotFoundError(RulesEntity, id, "id");
        }
        return rule;
    }

    async updateRule(id: number, data: Partial<RulesEntity>) {
        const rule = await this.getRulesById(id);
        Object.assign(rule, data);
        return await this.rulesRepo.save(rule);
    }

    async deleteRule(id: number) {
        const result = await this.rulesRepo.delete(id);
        if (result.affected === 0) {
            throw new EntityNotFoundError(RulesEntity, id, "id");
        }
        return { message: `Rule with id ${id} deleted successfully` };
    }
}

export default new RulesService();
