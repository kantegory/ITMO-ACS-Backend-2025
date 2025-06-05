import axios from 'axios';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3000';

export class AuthClient {
  async validateToken(token: string): Promise<{ id: number; email: string }> {
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/validate`, { token });
    return response.data;
  }
}
