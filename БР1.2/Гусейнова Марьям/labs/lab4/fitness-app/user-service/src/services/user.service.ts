import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import { CustomError } from '../utils/custom-error.util';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ user_id: id });
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new CustomError('User not found with this email', 404);
    }
    return user;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    // Проверка на обязательные поля
    if (!userData.email || !userData.passwordHash || !userData.firstName) {
        throw new CustomError('Missing required fields: email, password, firstName', 400);
    }

    // Проверка уникальности email
    const existingUser = await this.userRepository.findOneBy({ email: userData.email });
    if (existingUser) {
      throw new CustomError('Email already in use', 400);
    }

    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneBy({ user_id: id });
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    // Проверка уникальности email при обновлении
    if (userData.email && userData.email !== user.email) {
        const existingUserWithNewEmail = await this.userRepository.findOneBy({ email: userData.email });
        if (existingUserWithNewEmail && existingUserWithNewEmail.user_id !== id) {
            throw new CustomError('Email already in use by another user', 400);
        }
    }

    this.userRepository.merge(user, userData);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const userToDelete = await this.userRepository.findOneBy({ user_id: id });
    if (!userToDelete) {
      throw new CustomError('User not found', 404);
    }

    const result = await this.userRepository.delete(id);
    return !!result.affected;
  }
}