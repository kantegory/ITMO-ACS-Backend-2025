import {Education} from "../entities/education.entity";
import {AppDataSource} from "../config/data-source";

export class EducationService {
    private repository = AppDataSource.getRepository(Education);

    async getById(id: string) {
        const education = await this.repository.findOneBy({ id });
        if (!education) return null;
        return education;
    }

    async create(data: Partial<Education>) {
        const education = this.repository.create(data);
        return this.repository.save(education);
    }

    async update(id: string, data: Partial<Education>) {
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