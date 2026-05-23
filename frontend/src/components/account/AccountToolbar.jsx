import { t, MSG } from '../../i18n'
import Button from '../ui/Button'

export default function AccountToolbar() {
  return (
    <div className="account-toolbar">
      <Button variant="primary">{t(MSG.ACCOUNT_NEW_LIST)}</Button>
      <span className="account-toolbar__hint">{t(MSG.ACCOUNT_LISTS_HINT)}</span>
    </div>
  )
}
