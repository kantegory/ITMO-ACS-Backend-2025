import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({ where: { email }, relations: ['role'] });
    }

    async createUser(email: string, password: string, roleId: number): Promise<User> {
        const user = this.create({ email, password, role: { id: roleId } });
        return this.save(user);
    }
}