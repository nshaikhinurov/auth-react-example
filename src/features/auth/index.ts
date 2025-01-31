import { api } from "~/shared/api";

type AuthResponse = {
  token: string;
  type: string;
};

type ProfileResponse = {
  email: string;
  id: string;
};

export type AuthError = {
  code: string;
  message: string;
};

type Credentials = {
  email: string;
  password: string;
};

export async function registerRequest(data: Credentials) {
  const res = await api.post<AuthResponse>("/register", data);
  return res.data;
}

export async function loginRequest(data: Credentials) {
  const res = await api.post<AuthResponse>("/login", data);
  return res.data;
}

export async function getProfileRequest() {
  const res = await api.get<ProfileResponse>("/profile");

  return res.data;
}
