import {User} from "../entities/user.entity";
import {AppDataSource} from "../config/data-source";

export class UserService {
    private repository = AppDataSource.getRepository(User);

    async getById(id: string) {
        const user = await this.repository.findOneBy({id});
        if (!user) return null;
        return user;
    }

    async getByEmail(email: string) {
        const user = await this.repository.findOneBy({email});
        if (!user) return null;
        return user;
    }

    async create(data: Partial<User>) {
        const user = this.repository.create(data);
        return this.repository.save(user);
    }

    async update(id: string, data: Partial<User>) {
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