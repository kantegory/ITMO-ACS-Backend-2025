import { AppDataSource } from "../config/data-source";
import { Industry } from "../entities/Industry";

export class IndustryService {
    private repo = AppDataSource.getRepository(Industry);

    async create(data: Partial<Industry>): Promise<Industry> {
        const entity = this.repo.create(data);
        return this.repo.save(entity);
    }

    async getAll(): Promise<Industry[]> {
        return this.repo.find();
    }

    async getById(id: number): Promise<Industry | null> {
        return this.repo.findOneBy({ id });
    }

    async update(id: number, data: Partial<Industry>): Promise<Industry | null> {
        const entity = await this.getById(id);
        if (!entity) return null;
        Object.assign(entity, data);
        return this.repo.save(entity);
    }

    async delete(id: number): Promise<boolean> {
        const res = await this.repo.delete(id);
        return res.affected !== 0;
    }
}
