import { HttpClient } from '../utils/httpClient';
import { settings } from '../config/settings';
import { HttpError } from '../errors/HttpError';

interface EmployerCabinetResponse {
    success: boolean;
    data: {
        id: number;
        user: {
            id: number;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
        created_at: Date;
    };
}

export class UserService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient(settings.services.USER_SERVICE_URL);
    }

    async getEmployerByUserId(userId: number): Promise<{ id: number; userId: number }> {
        try {
            const response = await this.httpClient.get<EmployerCabinetResponse>(`/api/employer-cabinets/by-user/${userId}`);
            
            if (!response.success || !response.data) {
                throw new HttpError(404, 'Employer profile not found for this user');
            }
            
            return {
                id: response.data.id,
                userId: response.data.user.id
            };
        } catch (error: any) {
            console.error('Error fetching employer data:', error.response?.data || error.message);
            
            if (error.response?.status === 404) {
                throw new HttpError(404, 'Employer profile not found for this user. Please create an employer profile first.');
            }
            
            if (error instanceof HttpError) {
                throw error;
            }
            
            throw new HttpError(500, 'Failed to fetch employer information from user service');
        }
    }
} 