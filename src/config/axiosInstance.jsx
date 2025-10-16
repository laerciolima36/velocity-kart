import axios from 'axios';

const api = axios.create({
  baseURL: "http://192.168.1.123",
  // baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token JWT em cada request
api.interceptors.request.use(
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
api.interceptors.response.use(
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
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  window.location.href = "/login"; // ou use navigate do React Router
};

export default api;