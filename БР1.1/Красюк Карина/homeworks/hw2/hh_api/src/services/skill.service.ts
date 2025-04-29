import {Skill} from "../entities/skill.entity";
import {AppDataSource} from "../config/data-source";

export class SkillService {
    private repository = AppDataSource.getRepository(Skill);

    async getById(id: string) {
        const skill = await this.repository.findOneBy({id});
        if (!skill) return null;
        return skill;
    }

    async create(data: Partial<Skill>) {
        const skill = this.repository.create(data);
        return this.repository.save(skill);
    }

    async update(id: string, data: Partial<Skill>) {
        await this.getById(id);
        return this.repository.update(id, data);
    }

    async delete(id: string) {
        await this.getById(id);
        return this.repository.delete(id);
    }

    async getAll() {
        return this.repository.find();
    }
}