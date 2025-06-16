import { AppDataSource } from '../config/databaseConfig';
import { User } from '../entities/User';
import { signJwt } from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils/password';

export class UserService {
  public repo = AppDataSource.getRepository(User);

  async getAllUsers() {
    const users = await this.repo.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new Error('User not found');
    return user;
  }

  async register(data: any) {
    const existingUser = await this.repo.findOneBy({ email: data.email });
    if (existingUser) throw new Error('User already exists');
    const user = this.repo.create({
      ...data,
      password: hashPassword(data.password, 10),
    });
    return this.repo.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.repo.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'password',
        'role',
        'firstName',
        'lastName',
        'phone',
        'birthDate',
      ],
    });
    if (!user) throw new Error('User not found');
    if (!comparePassword(password, user.password)) {
      throw new Error('Invalid password');
    }
    const token = signJwt({ userId: user.id, role: user.role });
    return { user, token };
  }

  async changePassword(id: number, password: string) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new Error('User not found');
    user.password = hashPassword(password, 10);
    return this.repo.save(user);
  }
}

export default new UserService();
