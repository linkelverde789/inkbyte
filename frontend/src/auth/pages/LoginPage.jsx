import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import LoginForm from '../components/LoginForm'
import { RedirectIfAuth } from '../guards/RequireAuth'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <RedirectIfAuth>
      <LoginForm onSuccess={() => navigate(ROUTES.ACCOUNT)} />
    </RedirectIfAuth>
  )
}
