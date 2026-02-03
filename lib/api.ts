import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

// CSRF Token setup
let csrfTokenFetched = false;

const getCsrfToken = async () => {
  if (!csrfTokenFetched) {
    await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
    csrfTokenFetched = true;
  }
};

// Add request interceptor to get CSRF token before state-changing requests
api.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase();
  if (method && ['post', 'put', 'patch', 'delete'].includes(method)) {
    await getCsrfToken();
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Services
export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id: number) => api.get(`/services/${id}`),
  create: (data: any) => api.post('/services', data),
  update: (id: number, data: any) => api.put(`/services/${id}`, data),
  delete: (id: number) => api.delete(`/services/${id}`),
};

// Grooming Appointments
export const appointmentsAPI = {
  getAll: () => api.get('/grooming-appointments'),
  getById: (id: number) => api.get(`/grooming-appointments/${id}`),
  getByDate: (date: string) => api.get(`/grooming-appointments/date/search?date=${date}`),
  getByStatus: (status: string) => api.get(`/grooming-appointments/status/${status}`),
  create: (data: any) => api.post('/grooming-appointments', data),
  update: (id: number, data: any) => api.put(`/grooming-appointments/${id}`, data),
  delete: (id: number) => api.delete(`/grooming-appointments/${id}`),
};

// Custom Services
export const customServicesAPI = {
  getAll: () => api.get('/custom-services'),
  getById: (id: number) => api.get(`/custom-services/${id}`),
  getByStatus: (status: string) => api.get(`/custom-services/status/${status}`),
  create: (data: any) => api.post('/custom-services', data),
  update: (id: number, data: any) => api.put(`/custom-services/${id}`, data),
  delete: (id: number) => api.delete(`/custom-services/${id}`),
  approve: (id: number) => api.patch(`/custom-services/${id}/approve`),
  reject: (id: number) => api.patch(`/custom-services/${id}/reject`),
};

// Pets
export const petsAPI = {
  getAll: () => api.get('/pets'),
  getById: (id: number) => api.get(`/pets/${id}`),
  create: (data: any) => api.post('/pets', data),
  update: (id: number, data: any) => api.put(`/pets/${id}`, data),
  delete: (id: number) => api.delete(`/pets/${id}`),
};

// Customers
export const customersAPI = {
  getAll: () => api.get('/customers'),
  getById: (id: number) => api.get(`/customers/${id}`),
  create: (data: any) => api.post('/customers', data),
  update: (id: number, data: any) => api.put(`/customers/${id}`, data),
  delete: (id: number) => api.delete(`/customers/${id}`),
};
