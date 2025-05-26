import { AppDataSource } from "../config/data-source";
import { Employer } from "../entities/Employer";

export class EmployerService {
    private repo = AppDataSource.getRepository(Employer);

    async create(data: Partial<Employer>): Promise<Employer> {
        const entity = this.repo.create(data);
        return this.repo.save(entity);
    }

    async getAll(): Promise<Employer[]> {
        return this.repo.find();
    }

    async getById(id: number): Promise<Employer | null> {
        return this.repo.findOneBy({ id });
    }

    async update(id: number, data: Partial<Employer>): Promise<Employer | null> {
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
