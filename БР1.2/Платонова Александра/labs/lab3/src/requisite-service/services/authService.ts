import { UserRepository } from '../repositories/userRepository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthService {
    private userRepo: UserRepository;

    constructor() {
        this.userRepo = new UserRepository();
    }

    async register(email: string, password: string, roleId: number): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepo.createUser(email, hashedPassword, roleId);
    }

    async login(email: string, password: string): Promise<string | null> {
        const user = await this.userRepo.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }
        return jwt.sign({ id: user.id, role: user.role.name }, 'SECRET_KEY', { expiresIn: '1h' });
    }
}