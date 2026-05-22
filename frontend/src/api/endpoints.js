/** @type {const} */
export const API_ENDPOINTS = {
  AUTH_REGISTER: '/auth/register/',
  AUTH_LOGIN: '/auth/login/',
  AUTH_LOGOUT: '/auth/logout/',
  AUTH_ME: '/auth/me/',
  AUTH_TOKEN_REFRESH: '/auth/token/refresh/',
}

export const API_BASE = '/api'

/** Paths that must not trigger a refresh retry on 401 */
export const AUTH_PUBLIC_PATHS = new Set([
  API_ENDPOINTS.AUTH_REGISTER,
  API_ENDPOINTS.AUTH_LOGIN,
  API_ENDPOINTS.AUTH_LOGOUT,
  API_ENDPOINTS.AUTH_ME,
  API_ENDPOINTS.AUTH_TOKEN_REFRESH,
])
