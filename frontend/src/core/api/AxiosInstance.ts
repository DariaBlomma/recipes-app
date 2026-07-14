import axios, { type InternalAxiosRequestConfig } from 'axios';
import { AuthService } from '@/auth/services/AuthService';
import type {ApiRequestConfig} from "@/core/api/types";
import {extractErrorMessage} from "@/core/api/utils/errors.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else if (token) {
            resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = AuthService.token?.access;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const status = error.response?.status;
        const config = error.config as ApiRequestConfig;
        const isSilent = config?.silent === true;
        const onError = config?.onError;

        if (onError) {
            onError(error);
            return Promise.reject(error);
        }

        if (status === 401 && !originalRequest._retry) {
            if (!AuthService.token?.refresh) {
                AuthService.removeToken();
                window.location.href = '/auth/login';
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const success = await AuthService.refreshToken();
                if (success && AuthService.token) {
                    const newToken = AuthService.token.access;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    processQueue(null, newToken);
                    return api(originalRequest);
                }

                throw new Error('Refresh failed');
            } catch (refreshError) {
                processQueue(refreshError, null);
                AuthService.removeToken();
                window.location.href = '/auth/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        if (!error.response) {
            if (!isSilent) {
                const message = error.message || 'Ошибка сети: нет ответа от сервера';
                console.error('Ошибка сети:', message);
                // alert(message);
            }
            return Promise.reject(error);
        }

        if (status && status >= 400) {
            if (!isSilent) {
                const message = extractErrorMessage(error);
                console.error(message);
                // alert(message);
            }
        }

        return Promise.reject(error);
    },
);

export { api };