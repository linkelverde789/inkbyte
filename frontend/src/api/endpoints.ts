export const API_ENDPOINTS = {
  AUTH_REGISTER: "/auth/register/",
  AUTH_LOGIN: "/auth/login/",
  AUTH_LOGOUT: "/auth/logout/",
  AUTH_ME: "/auth/me/",
  AUTH_TOKEN_REFRESH: "/auth/token/refresh/",
  BOOKS_LIST: "/books/",
  GENRES_LIST: "/genres/",
  AUTHORS_LIST: "/authors/",
  DATA_AUTHORS: "/data/authors/", //only id,name
  DATA_GENRE: "/data/genres/", //only id,name
} as const;

export const API_DYNAMIC_ENDPOINTS = {
  BOOKS_DETAIL: (id: number | string) => `/books/${id}/`,
} as const;

export const API_BASE = "/api";

export const SELECT_DATA_ENDPOINTS = [
  {
    key: "authors",
    url: API_ENDPOINTS.DATA_AUTHORS,
  },
  {
    key: "genres",
    url: API_ENDPOINTS.DATA_GENRE,
  },
] as const;

export const RELATED_SHELF_ENDPOINTS = {
  series: API_ENDPOINTS.BOOKS_LIST,
  author: API_ENDPOINTS.BOOKS_LIST,
} as const;

export const AUTH_PUBLIC_PATHS = new Set<string>([
  API_ENDPOINTS.AUTH_REGISTER,
  API_ENDPOINTS.AUTH_LOGIN,
  API_ENDPOINTS.AUTH_LOGOUT,
  API_ENDPOINTS.AUTH_ME,
  API_ENDPOINTS.AUTH_TOKEN_REFRESH,
  API_ENDPOINTS.GENRES_LIST,
  API_ENDPOINTS.AUTHORS_LIST,
]);
