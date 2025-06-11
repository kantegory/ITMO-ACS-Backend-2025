import { AppDataSource } from "../config/database";
import { UserEntity } from "../models/user.entity";
import { UpdateUserDto } from "../dto/user.dto";

export class UserService {
    private userRepository = AppDataSource.getRepository(UserEntity);

    async getAllUsers() {
        return this.userRepository.find({
            select: ['id', 'username', 'email', 'role', 'created_at']
        });
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'username', 'email', 'role', 'created_at']
        });
        return user;
    }

    async getUserByUsernameOrEmail(value: string) {
        const user = await this.userRepository.findOne({
            where: [{ username: value }, { email: value }],
            select: ['id', 'username', 'email', 'role', 'created_at']
        });
        return user;
    }

    async updateUser(id: number, data: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error("User not found");
        }

        Object.assign(user, data);
        await this.userRepository.save(user);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
    }

    async deleteUser(id: number) {
        const result = await this.userRepository.delete(id);
        return result;
    }
}

export default new UserService();