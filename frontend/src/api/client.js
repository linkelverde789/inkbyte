import { LOCALE, t, MSG } from '../i18n'
import { ApiError } from './ApiError'
import {
  API_BASE,
  API_ENDPOINTS,
  AUTH_PUBLIC_PATHS,
} from './endpoints'

/**
 * @typedef {Object} RequestOptions
 * @property {boolean} [auth=true] - Attach session cookies; retry with refresh on 401
 * @property {boolean} [skipRefresh=false] - Do not attempt token refresh on 401
 * @property {Record<string, string>} [headers]
 * @property {boolean} [json=true]
 */

export class API {
  /** @type {Promise<void> | null} */
  #refreshPromise = null

  /**
   * @param {string} path
   * @param {RequestInit & RequestOptions} [options]
   */
  async request(path, options = {}) {
    const {
      auth = true,
      skipRefresh = false,
      json = true,
      headers: extraHeaders,
      ...fetchOptions
    } = options

    const url = this.#resolveUrl(path)
    const headers = this.#buildHeaders({ json, extra: extraHeaders })

    let response = await fetch(url, {
      ...fetchOptions,
      credentials: 'include',
      headers,
    })

    if (
      response.status === 401 &&
      auth &&
      !skipRefresh &&
      !AUTH_PUBLIC_PATHS.has(path)
    ) {
      await this.#refreshSession()
      response = await fetch(url, {
        ...fetchOptions,
        credentials: 'include',
        headers: this.#buildHeaders({ json, extra: extraHeaders }),
      })
    }

    return this.#parseResponse(response, { json })
  }

  get(path, options) {
    return this.request(path, { ...options, method: 'GET' })
  }

  post(path, body, options) {
    return this.request(path, {
      ...options,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  }

  #resolveUrl(path) {
    if (path.startsWith('/api')) {
      return path
    }
    const normalized = path.startsWith('/') ? path : `/${path}`
    return `${API_BASE}${normalized}`
  }

  #buildHeaders({ json, extra }) {
    return {
      'Accept-Language': LOCALE,
      ...(json ? { 'Content-Type': 'application/json' } : {}),
      ...extra,
    }
  }

  async #parseResponse(response, { json }) {
    if (response.status === 204) {
      return null
    }

    let data = {}
    if (json) {
      try {
        data = await response.json()
      } catch {
        if (!response.ok) {
          throw new ApiError(t(MSG.ERROR_NETWORK), { status: response.status })
        }
      }
    }

    if (!response.ok) {
      throw ApiError.fromResponse(data, response.status)
    }

    return data
  }

  #refreshSession() {
    if (!this.#refreshPromise) {
      this.#refreshPromise = this.request(API_ENDPOINTS.AUTH_TOKEN_REFRESH, {
        method: 'POST',
        auth: false,
        skipRefresh: true,
      })
        .catch((err) => {
          throw err.status === 401 ? ApiError.sessionExpired() : err
        })
        .finally(() => {
          this.#refreshPromise = null
        })
    }
    return this.#refreshPromise
  }
}

export const api = new API()
