import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginRequest, registerRequest, getProfileRequest } from "../api";
import { setCookie, deleteCookie } from "~/shared/lib/cookies";

// Запрос профиля
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileRequest,
    retry: false,
  });
}

// Регистрация
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      if ("token" in data) {
        setCookie("token", data.token);
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
      }
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      if ("token" in data) {
        setCookie("token", data.token);
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
      }
    },
  });
}

export function logout() {
  deleteCookie("token");
}
