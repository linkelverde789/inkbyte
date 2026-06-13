/** @type {const} */
export const MSG = {
  // App / brand
  BRAND_NAME: 'InkByte',
  LOADING: 'Loading…',

  // Errors (API)
  ERROR_GENERIC: 'Something went wrong.',
  ERROR_SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
  ERROR_NETWORK: 'Network error. Please try again.',

  // Routes / navigation
  NAV_HOME: 'Home',
  NAV_ACCOUNT: 'My account',
  NAV_SIGN_IN: 'Sign in',
  NAV_SIGN_OUT: 'Sign out',
  NAV_CREATE_ACCOUNT: 'Create account',

  // Banner
  BANNER_NEW_USER: 'New to InkByte? Start by creating your account.',

  // Home / hero
  HERO_TITLE: 'Read calmly, choose with care',
  HERO_LEAD:
    'Your personal library with lists, discovery, and a warm earthy palette.',
  HERO_GO_TO_ACCOUNT: 'Go to my account',

  // Auth — login
  AUTH_LOGIN_TITLE: 'Sign in',
  AUTH_LOGIN_DESCRIPTION: 'Sign in with your email to view your lists and downloads.',
  AUTH_LOGIN_SUBMIT: 'Sign in',
  AUTH_LOGIN_SUBMITTING: 'Signing in…',
  AUTH_LOGIN_NO_ACCOUNT: "Don't have an account?",
  AUTH_LOGIN_CREATE_ACCOUNT_LINK: 'Create account',

  // Auth — register
  AUTH_REGISTER_TITLE: 'Create account',
  AUTH_REGISTER_DESCRIPTION:
    'Register with your email to save lists and track your reading.',
  AUTH_REGISTER_SUBMIT: 'Create account',
  AUTH_REGISTER_SUBMITTING: 'Creating account…',
  AUTH_REGISTER_HAS_ACCOUNT: 'Already have an account?',
  AUTH_REGISTER_SIGN_IN_LINK: 'Sign in',

  // Auth — fields
  AUTH_FIELD_EMAIL: 'Email',
  AUTH_FIELD_PASSWORD: 'Password',
  AUTH_FIELD_PASSWORD_CONFIRM: 'Confirm password',
  AUTH_FIELD_FIRST_NAME: 'First name',
  AUTH_FIELD_EMAIL_PLACEHOLDER: 'you@example.com',
  AUTH_FIELD_PASSWORD_PLACEHOLDER: '••••••••',
  AUTH_FIELD_PASSWORD_MIN_PLACEHOLDER: 'At least 8 characters',
  AUTH_FIELD_FIRST_NAME_PLACEHOLDER: 'First name',
  AUTH_REMEMBER_ME: 'Keep me signed in on this device',

  // Account
  ACCOUNT_GREETING: 'Hello, {name}',
  ACCOUNT_LEAD:
    'Your saved lists. Open one to see the books you have been adding.',
  ACCOUNT_NEW_LIST: '+ New list',
  ACCOUNT_LISTS_HINT: 'Real lists will connect to the lists module.',
  ACCOUNT_SESSION_ACTIVE: 'Signed in as',
  ACCOUNT_SIGN_OUT: 'Sign out',
  ACCOUNT_LIST_BOOKS: '{count} books · Updated {updated}',

  // Placeholder lists
  LIST_PUBLIC_SHAREABLE: 'Public · Shareable',
  LIST_PRIVATE: 'Private',
  LIST_VACATION_TITLE: 'Vacation 2026',
  LIST_VACATION_DESC: 'For the suitcase: short fantasy and an essay on slow reading.',
  LIST_VACATION_UPDATED: '2 days ago',
  LIST_CLUB_TITLE: 'Fantasy club',
  LIST_CLUB_DESC: 'Pending titles for the monthly club.',
  LIST_CLUB_UPDATED: '1 week ago',
  LIST_GIFTS_TITLE: 'Gift ideas',
  LIST_GIFTS_DESC: 'Birthdays and holidays; titles without plot spoilers.',
  LIST_GIFTS_UPDATED: 'yesterday',

  // Footer
  FOOTER_ADDRESS: 'Callejón del Olmo 12, ground floor.',
  FOOTER_SECTION_ACCOUNT: 'Account',
  FOOTER_MY_LISTS: 'My lists',
  FOOTER_COPYRIGHT: '© 2026 InkByte',

  // Context errors (dev)
  AUTH_CONTEXT_OUTSIDE_PROVIDER: 'useAuth must be used within AuthProvider',
}
