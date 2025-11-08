import axios from 'axios';

export const BASE_URL = "http://192.168.0.7";

const api = axios.create({
  baseURL: BASE_URL,
  // baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: BASE_URL,
  // baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token JWT em cada request
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log("Token JWT adicionado ao header:", token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas com erro de autenticação
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response &&
      (error.response.status === 401 || error.response.status === 403)) {

      // Remove o token inválido
      localStorage.removeItem('jwtToken');

      // Redireciona para o login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const logout = () => {
  localStorage.removeItem("jwtToken");
  sessionStorage.removeItem("jwtToken");
  window.location.href = "/"; // ou use navigate do React Router
};

export default api;