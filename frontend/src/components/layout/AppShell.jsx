import { Outlet } from 'react-router-dom'
import { t, MSG } from '../../i18n'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import TopBanner from './TopBanner'

export default function AppShell() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  )
}
