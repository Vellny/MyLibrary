const API_URL = 'http://localhost:8000/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('auth_token');

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
    }

    return response;
};
