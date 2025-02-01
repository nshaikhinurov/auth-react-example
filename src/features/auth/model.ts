export type AuthResponse = {
  token: string;
  type: string;
};

export type ProfileResponse = {
  email: string;
  id: string;
};

export type AuthError = {
  code: string;
  message: string;
};

export type Credentials = {
  email: string;
  password: string;
};
