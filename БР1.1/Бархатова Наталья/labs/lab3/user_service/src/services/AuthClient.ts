import axios from 'axios';
import bcrypt from 'bcryptjs';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3000';

export class AuthClient {
  async getToken(authData: {
    email: string;
    password: string;
  }): Promise<{ token: string; userId: number }> {
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/get-token`, authData);
    return response.data;
  }

  async validateToken(token: string): Promise<{ id: number; email: string }> {
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/validate`, { token });
    return response.data;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

}
