import { AppDataSource } from "../config/data-source";
import { Job } from "../entities/Job";

export class JobService {
    private repo = AppDataSource.getRepository(Job);

    async create(data: Partial<Job>): Promise<Job> {
        const entity = this.repo.create(data);
        return this.repo.save(entity);
    }

    async getAll(): Promise<Job[]> {
        return this.repo.find();
    }

    async getById(id: number): Promise<Job | null> {
        return this.repo.findOneBy({ id });
    }

    async update(id: number, data: Partial<Job>): Promise<Job | null> {
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
