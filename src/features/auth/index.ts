import { api } from "~/shared/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Credentials, AuthResponse, ProfileResponse } from "./model";

const queryFunctions = {
  registerRequest: async (data: Credentials) => {
    const res = await api.post<AuthResponse>("/register", data);
    return res.data;
  },
  loginRequest: async (data: Credentials) => {
    const res = await api.post<AuthResponse>("/login", data);
    return res.data;
  },
  getProfileRequest: async () => {
    const res = await api.get<ProfileResponse>("/profile");
    return res.data;
  },
};

// Регистрация
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: queryFunctions.registerRequest,
    onSuccess: (data) => {
      if ("token" in data) {
        Cookies.set("token", data.token, {
          path: "/",
        });
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
      }
    },
  });
}

// Вход
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: queryFunctions.loginRequest,
    onSuccess: (data) => {
      if ("token" in data) {
        Cookies.set("token", data.token, {
          path: "/",
        });
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
      }
    },
  });
}

// Запрос профиля
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: queryFunctions.getProfileRequest,
    retry: false,
  });
}

// Выход
export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    Cookies.remove("token", { path: "/" });
    queryClient.invalidateQueries({
      queryKey: ["profile"],
    });
  };
}

// Реэкспорт модели
export * from "./model";
