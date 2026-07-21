
import axios from 'axios';
const LOCALHOST='http://localhost:5454'
const EC2_DEPLOYED='http://3.15.142.102:5454'

export const API_BASE_URL = EC2_DEPLOYED

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
