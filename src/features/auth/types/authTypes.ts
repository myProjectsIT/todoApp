export interface LoginRequest {
  login: string;
  password: string;
}

export interface UserMeResponse {
  name: string;
  role: string;
}