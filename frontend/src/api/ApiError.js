import { t, MSG } from '../i18n'

export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {{ code?: string, status?: number }} [meta]
   */
  constructor(message, { code, status } = {}) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }

  static fromResponse(data, status) {
    const message = data?.detail || t(MSG.ERROR_GENERIC)
    return new ApiError(message, { code: data?.code, status })
  }

  static sessionExpired() {
    return new ApiError(t(MSG.ERROR_SESSION_EXPIRED), { status: 401 })
  }
}
