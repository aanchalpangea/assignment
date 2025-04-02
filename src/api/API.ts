import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from 'axios';
// Extend AxiosRequestConfig to include _retry property
const BASE_URL_AUTH = import.meta.env.VITE_APP_AUTH_URL;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        // Check if it's a 401 error and if the request has already been retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            try {
                // Refresh the token
                const response = await axios.post(
                    `${BASE_URL_AUTH}/token/refresh`,
                    {
                        refresh_token: refreshToken,
                    }
                );

                const { access_token, refresh_token } = response.data;
                localStorage.setItem('token', access_token);
                localStorage.setItem('refreshToken', refresh_token);

                // Update the token in the headers
                axiosInstance.defaults.headers.common['Authorization'] =
                    `Bearer ${access_token}`;
                originalRequest.headers.Authorization = `Bearer ${access_token}`;

                // Retry the original request with the new token
                return axiosInstance(originalRequest);
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
