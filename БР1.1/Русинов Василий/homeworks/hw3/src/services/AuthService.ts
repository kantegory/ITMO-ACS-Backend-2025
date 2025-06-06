// src/services/AuthService.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export class AuthService {
    private userRepo = AppDataSource.getRepository(User);

    async register(email: string, password: string, name: string, role = "user") {
        const existing = await this.userRepo.findOneBy({ email });
        if (existing) throw new Error("User already exists");

        const password_hash = await bcrypt.hash(password, 10);

        const user = this.userRepo.create({
            email,
            name,
            password: password_hash,
        });

        await this.userRepo.save(user);
        return user;
    }

    async login(email: string, password: string) {
        const user = await this.userRepo.findOneBy({ email });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = jwt.sign(
            { id: user.id},
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { token };
    }
}
