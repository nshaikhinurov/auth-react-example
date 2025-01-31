import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

// Interceptor: при каждом запросе подтягиваем token из cookies и выставляем в Authorization
api.interceptors.request.use((config) => {
  const token = getTokenFromCookie("token"); // условная функция
  if (token && config.headers) {
    config.headers.Authorization = token;
  }
  return config;
});

// Пример функции чтения куки
function getTokenFromCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : "";
}
