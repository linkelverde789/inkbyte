import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import RegisterForm from '../components/RegisterForm'
import { RedirectIfAuth } from '../guards/RequireAuth'

export default function RegisterPage() {
  const navigate = useNavigate()

  return (
    <RedirectIfAuth>
      <RegisterForm onSuccess={() => navigate(ROUTES.ACCOUNT)} />
    </RedirectIfAuth>
  )
}
