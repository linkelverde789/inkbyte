import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { t, MSG } from '../../i18n'

export default function HeroSection({ isAuthenticated }) {
  return (
    <section className="hero-section">
      <div className="wrap">
        <div className="hero-card">
          <h1>{t(MSG.HERO_TITLE)}</h1>
          <p className="hero-card__lead">{t(MSG.HERO_LEAD)}</p>
          <div className="hero-card__actions">
            {isAuthenticated ? (
              <Link to={ROUTES.ACCOUNT} className="btn btn-primary">
                {t(MSG.HERO_GO_TO_ACCOUNT)}
              </Link>
            ) : (
              <>
                <Link to={ROUTES.REGISTER} className="btn btn-primary">
                  {t(MSG.NAV_CREATE_ACCOUNT)}
                </Link>
                <Link to={ROUTES.LOGIN} className="btn btn-ghost">
                  {t(MSG.NAV_SIGN_IN)}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
