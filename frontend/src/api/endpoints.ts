export const API_ENDPOINTS = {
  AUTH_REGISTER: "/auth/register/",
  AUTH_LOGIN: "/auth/login/",
  AUTH_LOGOUT: "/auth/logout/",
  AUTH_ME: "/auth/me/",
  AUTH_TOKEN_REFRESH: "/auth/token/refresh/",

  BOOKS_LIST: "/books/",
  BOOKS_DETAIL: (id: number | string) => `/books/${id}/`,
} as const;

export const API_BASE = "/api";

export const AUTH_PUBLIC_PATHS = new Set<string>([
  API_ENDPOINTS.AUTH_REGISTER,
  API_ENDPOINTS.AUTH_LOGIN,
  API_ENDPOINTS.AUTH_LOGOUT,
  API_ENDPOINTS.AUTH_ME,
  API_ENDPOINTS.AUTH_TOKEN_REFRESH,
]);
