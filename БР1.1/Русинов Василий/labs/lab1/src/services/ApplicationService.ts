import { AppDataSource } from "../config/data-source";
import { Application } from "../entities/Application";

export class ApplicationService {
    private repo = AppDataSource.getRepository(Application);

    async create(data: Partial<Application>): Promise<Application> {
        const entity = this.repo.create(data);
        return this.repo.save(entity);
    }

    async getAll(): Promise<Application[]> {
        return this.repo.find();
    }

    async getById(id: number): Promise<Application | null> {
        return this.repo.findOneBy({ id });
    }

    async update(id: number, data: Partial<Application>): Promise<Application | null> {
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
