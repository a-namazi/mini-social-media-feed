import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '../../models';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_API_URL || '/api',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error('API Error:', error);
                return Promise.reject(error);
            }
        );
    }

    async get<T>(url: string): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.client.get(url);
        return response.data;
    }

    async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.client.post(url, data);
        return response.data;
    }

    async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.client.put(url, data);
        return response.data;
    }

    async delete<T>(url: string): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(url);
        return response.data;
    }
}

export const apiClient = new ApiClient();