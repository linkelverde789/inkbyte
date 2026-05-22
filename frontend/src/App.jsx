import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import { ROUTES } from './constants/routes'
import { AuthProvider, LoginPage, RegisterPage } from './auth'
import AccountPage from './pages/AccountPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
            <Route path={ROUTES.REGISTER} element={<Navigate to={ROUTES.REGISTER} replace />} />
            <Route path={ROUTES.ACCOUNT} element={<Navigate to={ROUTES.ACCOUNT} replace />} />
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
