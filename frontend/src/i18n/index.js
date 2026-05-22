import { MSG } from './messages'

export const LOCALE = 'en'

/**
 * @param {keyof typeof MSG} key
 * @param {Record<string, string | number>} [params]
 */
export function t(key, params) {
  let text = MSG[key] ?? key
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.replace(`{${name}}`, String(value))
    }
  }
  return text
}

export { MSG }
