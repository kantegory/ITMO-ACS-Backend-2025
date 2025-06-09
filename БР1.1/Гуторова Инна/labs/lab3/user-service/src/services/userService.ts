import { AppDataSource } from '../config/database';
import User from '../entities/User';
import bcrypt from 'bcrypt';

export class UserService {
    private static userRepository = AppDataSource.getRepository(User);

    static async create(userData: {
        email: string;
        username: string;
        password: string;
        firstName?: string;
        lastName?: string;
        isAdmin?: boolean;
    }): Promise<User> {
        const user = new User();
        user.email = userData.email;
        user.username = userData.username;
        user.first_name = userData.firstName;
        user.last_name = userData.lastName;
        user.isAdmin = userData.isAdmin || false;
        
        user.password = userData.password;
        user.hashed_password = await bcrypt.hash(userData.password, 10);

        return await this.userRepository.save(user);
    }

    static async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ email });
    }

    static async findById(id: number): Promise<User | null> {
        return await this.userRepository.findOneBy({ id });
    }

    static async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    static async updateUser(
        id: number, 
        updateData: Partial<Omit<User, 'hashedPassword'> & { password?: string }>
    ): Promise<User> {
        const user = await this.findById(id);
        if (!user) throw new Error('User not found');
        
        if (updateData.password) {
            user.hashed_password = await bcrypt.hash(updateData.password, 10);
            delete updateData.password;
        }

        Object.assign(user, updateData);
        return await this.userRepository.save(user);
    }

    static async deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) throw new Error('User not found');
    }
}