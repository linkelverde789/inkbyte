import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../context/AuthContext'

export function useLogout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return useCallback(async () => {
    await logout()
    navigate(ROUTES.HOME, { replace: true })
  }, [logout, navigate])
}
