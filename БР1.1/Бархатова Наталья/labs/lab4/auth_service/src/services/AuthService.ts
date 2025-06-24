
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
  private jwtSecret = process.env.JWT_SECRET as string;

  generateToken(email: string, username: string): string {
    const payload = { email, username };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }

  async validateToken(token: string): Promise<{ id: number; email: string }> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.jwtSecret, (err, decoded) => {
        if (err || !decoded || typeof decoded !== 'object') {
          return reject(new Error('Invalid token'));
        }
        resolve(decoded as { id: number; email: string });
      });
    });
  }
}
