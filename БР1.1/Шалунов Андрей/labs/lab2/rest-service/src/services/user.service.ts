import { AppDataSource } from '../config/data-source';
import { User } from '../models/user.entity';

const userRepo = AppDataSource.getRepository(User);

export class UserService {
    static createUser(data: Partial<User>) {
        const user = userRepo.create(data);
        return userRepo.save(user);
    }

    static getAllUsers() {
        return userRepo.find();
    }

    static getUserById(id: number) {
        return userRepo.findOneBy({ user_id: id });
    }

    static getUserByEmail(email: string) {
        return userRepo.findOneBy({ email });
    }

    static async updateUser(id: number, data: Partial<User>) {
        await userRepo.update({ user_id: id }, data);
        return this.getUserById(id);
    }

    static deleteUser(id: number) {
        return userRepo.delete({ user_id: id });
    }
}