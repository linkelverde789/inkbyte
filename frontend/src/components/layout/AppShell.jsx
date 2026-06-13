import { Link, Outlet } from 'react-router-dom'
import { t, MSG } from '../../i18n'
import { ROUTES } from '../../constants/routes'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import TopBanner from './TopBanner'

export default function AppShell() {
  return (
    <div className="app-shell">
      <TopBanner>
        {t(MSG.BANNER_SHIPPING)} ·{' '}
        <Link to={ROUTES.HOME}>{t(MSG.BANNER_NOVELTIES)}</Link>
      </TopBanner>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  )
}
