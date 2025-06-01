import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import { UpdateUserDto } from "../dto/userDto";

const userRepository = AppDataSource.getRepository(User);

class UserService {
    getAllUsers() {
        return userRepository.find();
    }

    async getUserById(id: number) {
        const user = await userRepository.findOneBy({ id });
        return user;
    }

    async getUserByUsernameOrEmail(value: string) {
        const user = await userRepository.findOne({
            where: [{ username: value }, { email: value }],
        });
        return user;
    }

    async updateUser(id: number, data: UpdateUserDto) {
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            throw new Error("User not found");
        }

        Object.assign(user, data);
        await userRepository.save(user);

        return user;
    }

    async deleteUser(id: number) {
        const result = await userRepository.delete(id); // Ждем результат
        return result;
    }
}

export default new UserService();