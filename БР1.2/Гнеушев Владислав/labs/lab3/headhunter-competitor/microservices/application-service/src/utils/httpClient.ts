import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { settings } from '../config/settings';

export class HttpClient {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${settings.services.SERVICE_TOKEN}`
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.client.interceptors.response.use(
            (response: any) => response,
            (error: any) => {
                console.error('HTTP Client Error:', error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T>(url, config);
        return response.data;
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.post<T>(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.put<T>(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.delete<T>(url, config);
        return response.data;
    }
}

export const userServiceClient = new HttpClient(settings.services.USER_SERVICE_URL);
export const jobServiceClient = new HttpClient(settings.services.JOB_SERVICE_URL); 