import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Interceptor to add JWT token if available
API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authUser = (formData) => API.post('/users/login', formData);
export const registerUser = (formData) => API.post('/users', formData);
export const getLeads = () => API.get('/leads');
export const createLead = (leadData) => API.post('/leads', leadData);
export const updateLeadStatus = (id, status) => API.put(`/leads/${id}/status`, { status });
export const addInteraction = (id, interaction) => API.post(`/leads/${id}/interactions`, interaction);
export const getAgents = () => API.get('/users/agents');
export const deleteLead = (id) => API.delete(`/leads/${id}`);
export const deleteAgent = (id) => API.delete(`/users/${id}`);

export default API;
