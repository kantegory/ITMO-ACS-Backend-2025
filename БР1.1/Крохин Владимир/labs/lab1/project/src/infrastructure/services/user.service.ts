import { UserService } from '../../application/services/user.service';
import { UserRepository } from '../repositories/interfaces/user.repository';
import { UserModel } from '../../application/domain/user.model';
import { UserDto } from '../../dtos/user/UserDto';

export class UserInfrastructureService {
    constructor(
        private userService: UserService,
        private userRepository: UserRepository
    ) {}

    async createUser(username: string, password: string): Promise<UserDto> {
        const existingUser = await this.userRepository.findByUsername(username);
        if (existingUser) {
            throw new Error('User with this username already exists');
        }

        const user = this.userService.createUser(username, password);
        const savedUser = await this.userRepository.save(user);
        return this.mapToDto(savedUser);
    }

    async getUserById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
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

    async updateUser(id: number, username?: string, password?: string): Promise<UserDto> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        if (username) {
            const existingUser = await this.userRepository.findByUsername(username);
            if (existingUser && existingUser.id !== id) {
                throw new Error('User with this username already exists');
            }
        }

        this.userService.updateUser(user, username, password);
        const updatedUser = await this.userRepository.save(user);
        return this.mapToDto(updatedUser);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        await this.userRepository.delete(id);
    }

    private mapToDto(model: UserModel): UserDto {
        return {
            id: model.id,
            username: model.username,
            role: 'user' // По умолчанию роль 'user', она может быть изменена позже через AuthService
        };
    }
} 