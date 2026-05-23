import { t, MSG } from '../../i18n'

export default function SessionInfo({ email, onLogout }) {
  return (
    <p className="session-info">
      {t(MSG.ACCOUNT_SESSION_ACTIVE)} <strong>{email}</strong>.{' '}
      <button type="button" className="link-button" onClick={onLogout}>
        {t(MSG.ACCOUNT_SIGN_OUT)}
      </button>
    </p>
  )
}
