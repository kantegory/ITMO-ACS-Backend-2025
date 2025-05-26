import { AppDataSource } from "../config/data-source";
import { Resume } from "../entities/Resume";

export class ResumeService {
    private repo = AppDataSource.getRepository(Resume);

    async create(data: Partial<Resume>): Promise<Resume> {
        const entity = this.repo.create(data);
        return this.repo.save(entity);
    }

    async getAll(): Promise<Resume[]> {
        return this.repo.find();
    }

    async getById(id: number): Promise<Resume | null> {
        return this.repo.findOneBy({ id });
    }

    async update(id: number, data: Partial<Resume>): Promise<Resume | null> {
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
