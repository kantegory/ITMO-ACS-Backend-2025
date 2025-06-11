import axios from 'axios';
import { Request } from 'express';

export class PropertyClient {
    private propertyServiceUrl: string;

    constructor() {
        this.propertyServiceUrl = process.env.PROPERTY_SERVICE_URL || 'http://property-service:3002';
    }

    async getPropertyById(id: number, req: Request) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Error('Authorization token is required');
            }

            const response = await axios.get(`${this.propertyServiceUrl}/properties/${id}`, {
                headers: { Authorization: token }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching property:', error);
            throw new Error('Failed to fetch property');
        }
    }
}

export default new PropertyClient();