import axios from 'axios';
import { Request } from 'express';

export class AuthClient {
    private authServiceUrl: string;

    constructor() {
        this.authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
    }

    async verifyToken(req: Request) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Error('Authorization token is required');
            }

            const response = await axios.get(`${this.authServiceUrl}/auth/verify`, {
                headers: { Authorization: token }
            });

            return response.data.user;
        } catch (error) {
            console.error('Auth verification error:', error);
            throw new Error('Invalid or expired token');
        }
    }
}

export default new AuthClient();