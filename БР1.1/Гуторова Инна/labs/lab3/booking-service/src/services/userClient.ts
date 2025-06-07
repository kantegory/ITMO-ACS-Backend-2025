import axios from 'axios';

export class UserClient {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = process.env.USER_SERVICE_URL || 'http://user-service:3000';
    }

    async getUserById(userId: number) {
        try {
            const response = await axios.get(`${this.baseUrl}/api/users/${userId}`, {
                timeout: 5000
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user data');
        }
    }
}

export const userClient = new UserClient();