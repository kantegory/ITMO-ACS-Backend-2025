import { Repository, ObjectLiteral, DeepPartial } from 'typeorm';

export abstract class BaseService<T extends ObjectLiteral> {
    protected constructor(protected readonly repo: Repository<T>) {}

    public async list(): Promise<T[]> {
        return this.repo.find();
    }

    public async getById(id: string): Promise<T> {
        const e = await this.repo.findOneBy({ id } as any);
        if (!e) throw new Error(`${this.constructor.name}(${id}) not found`);
        return e;
    }

    public async create(data: DeepPartial<T>): Promise<T> {
        const ent = this.repo.create(data);
        return this.repo.save(ent);
    }

    public async update(id: string, data: Partial<T>): Promise<T> {
        await this.repo.update(id, data);
        return this.getById(id);
    }

    public async delete(id: string): Promise<void> {
        const result = await this.repo.delete(id);
        if (result.affected === 0) throw new Error(`${this.constructor.name}(${id}) not found`);
    }
}