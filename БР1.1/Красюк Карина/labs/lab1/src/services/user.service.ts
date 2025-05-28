import dataSource from "../config/data-source";
import {User} from "../entities/user.entity";

class UserService {
    private repository = dataSource.getRepository(User);

    public async getAll(): Promise<User[]> {
        return await this.repository.find();
    }

    public async getById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({id: id});
        if (!user) return null;
        return user;
    }

    public async getUserByMail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({email: email})
        if (!user) return null;
        return user;
    }

    public async create(user: User): Promise<User> {
        const savedUser = await this.repository.save(user);
        return user;
    }

    async update(id: string, data: Partial<User>) {
        await this.getById(id);
        return this.repository.update(id, data);
    }

    async delete(id: string) {
        await this.getById(id);
        return this.repository.delete(id);
    }
}

export default new UserService();