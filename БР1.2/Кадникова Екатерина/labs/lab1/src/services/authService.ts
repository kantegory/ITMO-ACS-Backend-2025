import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async register(username: string, email: string, password: string) {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            username,
            email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = generateToken(user);

        return { token };
    }
}

export default new AuthService();