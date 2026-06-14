/** @type {const} */
export const MSG = {
  ERROR_GENERIC: "Something went wrong.",
  ERROR_SESSION_EXPIRED: "Your session has expired. Please sign in again.",
  ERROR_NETWORK: "Network error. Please try again.",
  AUTH_CONTEXT_OUTSIDE_PROVIDER: "useAuth must be used within AuthProvider",
} as const;

export type MessageKey = (typeof MSG)[keyof typeof MSG];

export const LOCALE = "es";

export function t(message: MessageKey): string {
  return message;
}
