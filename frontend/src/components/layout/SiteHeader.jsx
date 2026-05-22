import { Link, NavLink } from 'react-router-dom'
import { useAuth, useLogout } from '../../auth'
import Button from '../ui/Button'
import { ROUTES } from '../../constants/routes'
import { t, MSG } from '../../i18n'

export default function SiteHeader() {
  const { isAuthenticated, user } = useAuth()
  const logout = useLogout()

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <span className="brand">
          <Link to={ROUTES.HOME}>{t(MSG.BRAND_NAME)}</Link>
        </span>
        <ul className="nav-links">
          <li>
            <NavLink to={ROUTES.HOME} end>
              {t(MSG.NAV_HOME)}
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to={ROUTES.ACCOUNT}>{t(MSG.NAV_ACCOUNT)}</NavLink>
            </li>
          )}
        </ul>
        <div className="nav-aux">
          {isAuthenticated ? (
            <>
              <span className="nav-user">{user?.first_name || user?.email}</span>
              <Button variant="ghost" onClick={() => logout()}>
                {t(MSG.NAV_SIGN_OUT)}
              </Button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>{t(MSG.NAV_SIGN_IN)}</Link>
              <Link to={ROUTES.REGISTER} className="btn btn-primary btn--compact">
                {t(MSG.NAV_CREATE_ACCOUNT)}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
