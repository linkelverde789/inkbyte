import { t, MSG } from '../../i18n'

export default function AccountHeader({ name }) {
  return (
    <div className="page-head">
      <h1>{t(MSG.ACCOUNT_GREETING, { name })}</h1>
      <p>{t(MSG.ACCOUNT_LEAD)}</p>
    </div>
  )
}
