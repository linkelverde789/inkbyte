import { api, API_ENDPOINTS } from '../api'

const NO_AUTH = { auth: false }

/**
 * @param {Record<string, unknown>} payload
 */
export function register(payload) {
  return api.post(API_ENDPOINTS.AUTH_REGISTER, payload, NO_AUTH)
}

/**
 * @param {Record<string, unknown>} payload
 */
export function login(payload) {
  return api.post(API_ENDPOINTS.AUTH_LOGIN, payload, NO_AUTH)
}

export function fetchMe() {
  return api.get(API_ENDPOINTS.AUTH_ME, { skipRefresh: true })
}

export function logout() {
  return api.post(API_ENDPOINTS.AUTH_LOGOUT, {}, {
    auth: false,
    skipRefresh: true,
  })
}
