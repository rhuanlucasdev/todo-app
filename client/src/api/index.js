import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Corrigindo o interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Garante que o objeto headers exista antes de atribuir
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
