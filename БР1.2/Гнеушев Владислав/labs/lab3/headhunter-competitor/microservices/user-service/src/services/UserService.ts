import { Repository } from "typeorm";
import { User } from "../models/User";
import { userDataSource } from "../config/data-source";
import { AuthService } from "./AuthService";
import * as bcrypt from 'bcryptjs';

export interface CreateUserDto {
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export class UserService {
    private userRepository: Repository<User>;
    private authService: AuthService;

    constructor() {
        this.userRepository = userDataSource.getRepository(User);
        this.authService = new AuthService();
    }

    async createUser(createUserDto: CreateUserDto): Promise<{ user: User; token: string }> {
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email }
        });

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const user = new User();
        user.email = createUserDto.email;
        user.password = await bcrypt.hash(createUserDto.password, 10);

        const savedUser = await this.userRepository.save(user);

        const token = this.authService.generateToken(savedUser);
        return { user: savedUser, token };
    }

    async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
            relations: ['employeeCabinet', 'employerCabinet']
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await user.comparePassword(loginDto.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = this.authService.generateToken(user);
        return { user, token };
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { id },
            relations: ['employeeCabinet', 'employerCabinet']
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email },
            relations: ['employeeCabinet', 'employerCabinet']
        });
    }

    async updateUser(id: number, updateData: Partial<User>): Promise<User> {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        await this.userRepository.update(id, updateData);
        const updatedUser = await this.getUserById(id);
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    }

    async deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('User not found');
        }
    }
}