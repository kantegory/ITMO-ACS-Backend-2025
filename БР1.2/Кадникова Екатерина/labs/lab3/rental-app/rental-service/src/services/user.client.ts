import axios from 'axios';
import { Request } from 'express';

export class UserClient {
    private userServiceUrl: string;

    constructor() {
        this.userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:3001';
    }

    async getUserById(id: number, req: Request) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Error('Authorization token is required');
            }

            const response = await axios.get(`${this.userServiceUrl}/users/${id}`, {
                headers: { Authorization: token }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Failed to fetch user');
        }
    }
}

export default new UserClient();