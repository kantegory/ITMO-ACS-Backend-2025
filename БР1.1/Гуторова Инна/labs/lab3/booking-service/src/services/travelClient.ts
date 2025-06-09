import axios from 'axios';

export class TravelClient {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = process.env.TRAVEL_SERVICE_URL || 'http://travel-service:3001';
    }

    async getTripById(tripId: number) {
        try {
            const response = await axios.get(`${this.baseUrl}/api/trips/${tripId}`, {
                timeout: 5000
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch trip data');
        }
    }


    async getRouteById(routeId: number) {
        try {
            const response = await axios.get(`${this.baseUrl}/api/routes/${routeId}`, {
                timeout: 5000
            });
            return response.data;
        } catch (error) {
            throw new Error('Route not found or service unavailable');
        }
    }}

export const travelClient = new TravelClient();