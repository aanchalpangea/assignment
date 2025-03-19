import axios from 'axios';

// Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      // here implement the refresh token and remove other step
    }
    return Promise.reject(error);
  }
);

// Simple request methods
export const getAPI = async (url: string) => {
  const response = await API.get(url);
  return response.data;
};

export const postAPI = async (url: string, data: any) => {
  const response = await API.post(url, data);
  return response.data;
};

export const putAPI = async (url: string, data: any) => {
  const response = await API.put(url, data);
  return response.data;
};

export const deleteAPI = async (url: string) => {
  const response = await API.delete(url);
  return response.data;
};

export default API;
