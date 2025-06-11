import { userServiceClient } from '../utils/httpClient';
import { HttpError } from '../errors/HttpErrors';

interface EmployeeCabinetResponse {
    success: boolean;
    data: {
        id: number;
        user: {
            id: number;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
        first_name: string;
        last_name: string;
        resume_text?: string;
        updated_resume_at: Date;
        created_at: Date;
    };
}

export class UserService {
    async getEmployeeByUserId(userId: number): Promise<{ id: number; userId: number }> {
        try {
            const response = await userServiceClient.get<EmployeeCabinetResponse>(`/api/employee-cabinets/by-user/${userId}`);
            
            if (!response.success || !response.data) {
                throw new HttpError(404, 'Employee profile not found for this user');
            }
            
            return {
                id: response.data.id,
                userId: response.data.user.id
            };
        } catch (error: any) {
            console.error('Error fetching employee data:', error.response?.data || error.message);
            
            if (error.response?.status === 404) {
                throw new HttpError(404, 'Employee profile not found for this user. Please create an employee profile first.');
            }
            
            if (error instanceof HttpError) {
                throw error;
            }
            
            throw new HttpError(500, 'Failed to fetch employee information from user service');
        }
    }
} 