import { AppDataSource } from '../config/databaseConfig';
import { User } from '../entities/User';
import { signJwt } from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils/password';

export class UserService {
  static async register(data: any) {
    const userRepo = AppDataSource.getRepository(User);
    const existingUser = await userRepo.findOneBy({ email: data.email });
    if (existingUser) throw new Error('User already exists');
    const user = userRepo.create({
      ...data,
      password: hashPassword(data.password, 10),
    });
    return userRepo.save(user);
  }
  static async login(email: string, password: string) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });
    if (!user) throw new Error('User not found');
    if (!comparePassword(password, user.password)) {
      throw new Error('Invalid password');
    }
    const token = signJwt({ userId: user.id, role: user.role });
    return { user, token };
  }
  static async changePassword(id: number, password: string) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id });
    if (!user) throw new Error('User not found');
    user.password = hashPassword(password, 10);
    return userRepo.save(user);
  }
}
