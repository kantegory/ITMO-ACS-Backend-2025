import {Experience} from "../entities/experience.entity";
import {AppDataSource} from "../config/data-source";

export class ExperienceService {
    private repository = AppDataSource.getRepository(Experience);

    async getById(id: string) {
        const experience = await this.repository.findOneBy({id});
        if (!experience) return null;
        return experience;
    }

    async create(data: Partial<Experience>) {
        const experience = this.repository.create(data);
        return this.repository.save(experience);
    }

    async update(id: string, data: Partial<Experience>) {
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