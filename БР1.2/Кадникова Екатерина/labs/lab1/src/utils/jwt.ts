import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "../models/user";
import * as dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ? parseInt(process.env.JWT_EXPIRES_IN) : 3600;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

interface TokenPayload {
    id: number;
    email: string;
    role: string;
}

export const generateToken = (user: User): string => {
    const payload: TokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };

    const options: SignOptions = {
        expiresIn: JWT_EXPIRES_IN,
    };

    return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};