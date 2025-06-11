import axios from 'axios';

export class UserClient {
    private userServiceUrl: string;

    constructor() {
        this.userServiceUrl = process.env.USER_SERVICE_URL || 'http://user-service:3001';
    }

    async getUserById(id: number, authorizationHeader?: string) {
        try {
            if (!authorizationHeader) {
                throw new Error('Authorization header is required');
            }

            const response = await axios.get(`${this.userServiceUrl}/users/${id}`, {
                headers: {
                    Authorization: authorizationHeader
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Failed to fetch user');
        }
    }
}

export default new UserClient();