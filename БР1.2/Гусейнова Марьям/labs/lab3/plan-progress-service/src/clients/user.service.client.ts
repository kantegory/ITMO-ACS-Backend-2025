import axios from 'axios';
import appConfig from '../config';
import { CustomError } from '../utils/custom-error.util';

export class UserServiceClient {
    private userServiceUrl: string;

    constructor() {
        this.userServiceUrl = appConfig.userServiceUrl;
    }

    async doesUserExist(userId: number): Promise<boolean> {
        try {
            // Используем внутренний эндпоинт
            const response = await axios.get<{ exists: boolean }>(
                `${this.userServiceUrl}/users/internal/exists/${userId}`
            );
            // Ожидаем { exists: true } со статусом 200
            return response.status === 200 && response.data.exists === true;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return false;
            }
            // Для других ошибок пробрасываем CustomError
            console.error(`Error checking user existence for ID ${userId}:`, error.message);
            throw new CustomError(`Failed to communicate with User Service: ${error.message}`, error.response?.status || 500);
        }
    }
}