import jwt, { SignOptions } from 'jsonwebtoken';
import { UserRole } from '../entities/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';
const ACCESS_TOKEN_EXPIRES_IN: number =
  Number(process.env.JWT_EXPIRATION) || 3600;

export interface JwtPayload {
  userId: number;
  role: UserRole;
}

export function signJwt(
  payload: JwtPayload,
  options: SignOptions = {},
): string {
  const signOptions: SignOptions = {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    ...options,
  };
  return jwt.sign(payload, JWT_SECRET, signOptions);
}

export function verifyJwt<T = JwtPayload>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
