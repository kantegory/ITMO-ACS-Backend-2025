import { Repository } from 'typeorm';
import dataSource from '../config/data-source';
import { User } from '../models/User';

export class UserService {
    private readonly repo: Repository<User>;

    constructor() {
        this.repo = dataSource.getRepository(User);
    }

    public async list(): Promise<User[]> {
        return this.repo.find();
    }

    public async getById(id: string): Promise<User> {
        const u = await this.repo.findOne({ where: { id } });
        if (!u) throw new Error(`User(${id}) not found`);
        return u;
    }

    public async create(data: Partial<User>): Promise<User> {
        const ent = this.repo.create(data);
        return this.repo.save(ent);
    }

    public async update(id: string, data: Partial<User>): Promise<User> {
        const result = await this.repo.update(id, data);
        if (result.affected === 0) throw new Error(`User(${id}) not found`);
        return this.getById(id);
    }

    public async delete(id: string): Promise<void> {
        const result = await this.repo.delete(id);
        if (result.affected === 0) throw new Error(`User(${id}) not found`);
    }

    public async getByEmail(email: string): Promise<User | null> {
        return this.repo.findOne({ where: { email } });
    }
}
