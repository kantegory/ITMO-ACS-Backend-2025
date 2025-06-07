import axios from 'axios';
import { Request } from 'express';

class AuthClient {
    private readonly authServiceBaseUrl: string;

    constructor() {
        this.authServiceBaseUrl = process.env.USER_SERVICE_URL || 'http://user-service:5000';
    }

    async verifyToken(token: string): Promise<{ id: number; email: string; isAdmin: boolean }> {
        try {
            console.log(token)
            const response = await axios.get(`${this.authServiceBaseUrl}/api/auth/verify-token`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.data.user) {
                throw new Error('Invalid user data in response');
            }

            return {
                id: response.data.user.id,
                email: response.data.user.email,
                isAdmin: response.data.user.isAdmin
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Auth service error:', error.response?.data || error.message);
                throw new Error(error.response?.data?.message || 'Auth service unavailable');
            }
            throw new Error('Authentication failed');
        }
    }
}

export const authClient = new AuthClient();