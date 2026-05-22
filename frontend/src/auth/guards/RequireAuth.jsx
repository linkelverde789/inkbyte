import { Navigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { t, MSG } from '../../i18n'
import { useAuth } from '../context/AuthContext'

function AuthLoading() {
  return (
    <main className="page-main">
      <div className="wrap page-loading">{t(MSG.LOADING)}</div>
    </main>
  )
}

export function RequireAuth({ children, redirectTo = ROUTES.LOGIN }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <AuthLoading />
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export function RedirectIfAuth({ children, redirectTo = ROUTES.ACCOUNT }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <AuthLoading />
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}
