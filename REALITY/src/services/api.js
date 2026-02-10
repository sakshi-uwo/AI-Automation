import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add Interceptor to attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('aiauto_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('aiauto_token', response.data.token);
            localStorage.setItem('aiauto_user', JSON.stringify(response.data));
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('aiauto_token');
        localStorage.removeItem('aiauto_user');
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('aiauto_user');
        return user ? JSON.parse(user) : null;
    }
};

export const dashboardService = {
    getStats: async () => {
        const response = await api.get('/dashboard/stats');
        return response.data;
    },
};

export const leadService = {
    getAll: async () => {
        const response = await api.get('/leads');
        return response.data;
    },
    seed: async () => {
        const response = await api.post('/leads/seed');
        return response.data;
    },
};

export const chatService = {
    sendMessage: async (messageData) => {
        const response = await api.post('/chat', messageData);
        return response.data;
    },
};

export default api;
