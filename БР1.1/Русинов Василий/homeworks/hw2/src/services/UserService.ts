import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export class UserService {
    private userRepo = AppDataSource.getRepository(User);

    async create(data: Partial<User>): Promise<User> {
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }

    async getAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    async getById(id: number): Promise<User | null> {
        return this.userRepo.findOneBy({ id });
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOneBy({ email });
    }

    async update(id: number, data: Partial<User>): Promise<User | null> {
        const user = await this.getById(id);
        if (!user) return null;
        Object.assign(user, data);
        return this.userRepo.save(user);
    }

    async delete(id: number): Promise<boolean> {
        const res = await this.userRepo.delete(id);
        return res.affected !== 0;
    }
}
