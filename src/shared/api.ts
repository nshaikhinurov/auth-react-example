import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

// Interceptor: при каждом запросе подтягиваем token из cookies и выставляем в Authorization
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token && config.headers) {
    config.headers.Authorization = token;
  }

  return config;
});
