import axios from 'axios';

export interface User {
  UserID: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export class UserService {
  private userServiceUrl: string;

  constructor() {
    this.userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:3001';
  }

  async getUserById(userId: number): Promise<User | null> {
    try {
      const response = await axios.post(`${this.userServiceUrl}/api/internal`, {
        service: 'user-service',
        action: 'getUserById',
        data: { userId }
      });

      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
} 