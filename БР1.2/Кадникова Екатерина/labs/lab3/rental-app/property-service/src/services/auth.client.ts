import axios from 'axios';
import { Request } from 'express';

export class AuthClient {
    private authServiceUrl: string;

    constructor() {
        this.authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3000';
    }

    async verifyToken(req: Request) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new Error('Token not provided');
            }

            const response = await axios.get(`${this.authServiceUrl}/auth/verify`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data.user;
        } catch (error) {
            console.error('Auth verification error:', error);
            throw new Error('Invalid or expired token');
        }
    }
}

export default new AuthClient();