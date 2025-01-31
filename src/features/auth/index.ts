import { api } from "~/shared/api";

type AuthResponse = {
  token: string;
  type: string;
};

type AuthError = {
  code: string;
  message: string;
};

type Credentials = {
  email: string;
  password: string;
};

export async function registerRequest(data: Credentials) {
  const res = await api.post<AuthResponse | AuthError>("/register", data);
  return res.data;
}

export async function loginRequest(data: Credentials) {
  const res = await api.post<AuthResponse | AuthError>("/login", data);

  if (!(res.status === 200)) {
    throw res.data;
  }

  return res.data;
}

export async function getProfileRequest() {
  const res = await api.get<{ email: string; id: string }>("/profile");
  return res.data;
}
