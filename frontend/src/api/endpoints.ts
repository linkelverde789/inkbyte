export const API_ENDPOINTS = {
  AUTH_REGISTER: "/auth/register/",
  AUTH_LOGIN: "/auth/login/",
  AUTH_LOGOUT: "/auth/logout/",
  AUTH_ME: "/auth/me/",
  AUTH_TOKEN_REFRESH: "/auth/token/refresh/",
  BOOKS_LIST: "/books/",
  BOOKS_FROM_SERIES: "/books/books_from_series",
  BOOKS_FROM_AUTHOR: "/books/books_from_author",
  GENRES_LIST: "/genres/",
  AUTHORS_LIST: "/authors/",
  DATA_AUTHORS: "/data/authors/",
  DATA_GENRES: "/data/genres/",
  PROFILE: "/profile/",
  MY_LISTS: "/lists/mine/",
  LISTS: "/lists/",
} as const;

export const API_DYNAMIC_ENDPOINTS = {
  BOOKS_DETAIL: (id: number | string) => `/books/${id}/`,
  BOOKS_FROM_SERIES: (id: number | string) => `/books/series/${id}/`,
  BOOKS_FROM_AUTHOR: (id: number | string) => `/books/author/${id}/`,
  EDIT_LISTS: (id: number | string) => `/lists/${id}/`,
} as const;

export const API_BASE = "/api";

export const SELECT_DATA_ENDPOINTS = {
  authors: API_ENDPOINTS.DATA_AUTHORS,
  genres: API_ENDPOINTS.DATA_GENRES,
};

export const RELATED_SHELF_ENDPOINTS = {
  series: API_DYNAMIC_ENDPOINTS.BOOKS_FROM_SERIES,
  author: API_DYNAMIC_ENDPOINTS.BOOKS_FROM_AUTHOR,
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
