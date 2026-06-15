import { api, API_ENDPOINTS } from "@/api";
import type { AuthResponse, LoginPayload, RegisterPayload } from "./types";

const NO_AUTH = { auth: false };

export function register(payload: RegisterPayload) {
  return api.post<AuthResponse>(API_ENDPOINTS.AUTH_REGISTER, payload, NO_AUTH);
}

export function login(payload: LoginPayload) {
  return api.post<AuthResponse>(API_ENDPOINTS.AUTH_LOGIN, payload, NO_AUTH);
}

export function fetchMe() {
  return api.get<AuthResponse>(API_ENDPOINTS.AUTH_ME, { skipRefresh: true });
}

export function logout() {
  return api.post(API_ENDPOINTS.AUTH_LOGOUT, {}, {
    auth: false,
    skipRefresh: true,
  });
}
