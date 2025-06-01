import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

type RegisterInput = {
    username: string;
    email: string;
    password: string;
};

type LoginInput = {
    email: string;
    password: string;
};

class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async register(data: RegisterInput) {
        const existingUser = await this.userRepository.findOne({ where: { email: data.email } });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = this.userRepository.create({
            username: data.username,
            email: data.email,
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

    async login(data: LoginInput) {
        const user = await this.userRepository.findOne({ where: { email: data.email } });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = generateToken(user);

        return { token };
    }
}

export default new AuthService();