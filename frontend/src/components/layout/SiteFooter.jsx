import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { t, MSG } from '../../i18n'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <h4>{t(MSG.BRAND_NAME)}</h4>
          <p className="footer-lead">{t(MSG.FOOTER_ADDRESS)}</p>
        </div>
        <div>
          <h4>{t(MSG.FOOTER_SECTION_ACCOUNT)}</h4>
          <ul className="footer-links">
            <li>
              <Link to={ROUTES.ACCOUNT}>{t(MSG.FOOTER_MY_LISTS)}</Link>
            </li>
            <li>
              <Link to={ROUTES.LOGIN}>{t(MSG.NAV_SIGN_IN)}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>{t(MSG.FOOTER_COPYRIGHT)}</span>
        <Link to={ROUTES.ACCOUNT} className="footer-bottom__link">
          {t(MSG.NAV_ACCOUNT)}
        </Link>
      </div>
    </footer>
  )
}
