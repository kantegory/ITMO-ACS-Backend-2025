import { UserRepository } from '../repositories/interfaces/user.repository';
import { UserModel } from '../domain/user.model';
import { UserDto } from '../../dtos/user/UserDto';

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(username: string, password: string): Promise<UserDto> {
        const existingUser = await this.userRepository.findByUsername(username);
        if (existingUser) {
            throw new Error('Пользователь с таким именем уже существует');
        }

        const user = new UserModel(null, username, password);
        const savedUser = await this.userRepository.save(user);
        return this.mapToDto(savedUser);
    }

    async getUserById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        return this.mapToDto(user);
    }

    async getUserByUsername(username: string): Promise<UserDto> {
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        return this.mapToDto(user);
    }

    async updateUser(id: number, username?: string, password?: string, ): Promise<UserDto> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('Пользователь не найден');
        }

        if (username) {
            const existingUser = await this.userRepository.findByUsername(username);
            if (existingUser && existingUser.id !== id) {
                throw new Error('Пользователь с таким именем уже существует');
            }
            user.username = username;
        }

        if (password) {
            user.password = password;
        }

        const updatedUser = await this.userRepository.save(user);
        return this.mapToDto(updatedUser);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        await this.userRepository.delete(id);
    }

    private mapToDto(model: UserModel): UserDto {
        return {
            id: model.id,
            username: model.username,
        };
    }
} 