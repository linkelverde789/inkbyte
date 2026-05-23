import { useState } from 'react'
import { Link } from 'react-router-dom'
import Field from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import { ROUTES } from '../../constants/routes'
import { t, MSG } from '../../i18n'
import { useAuth } from '../context/AuthContext'
import { useAuthForm } from '../hooks/useAuthForm'
import AuthCard from './AuthCard'
import FormError from './FormError'
import RememberMeField from './RememberMeField'

export default function LoginForm({ onSuccess }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  const { error, submitting, handleSubmit } = useAuthForm(async () => {
    await login({ email, password, remember_me: rememberMe })
    onSuccess?.()
  })

  return (
    <AuthCard
      title={t(MSG.AUTH_LOGIN_TITLE)}
      description={t(MSG.AUTH_LOGIN_DESCRIPTION)}
      footer={
        <>
          {t(MSG.AUTH_LOGIN_NO_ACCOUNT)}{' '}
          <Link to={ROUTES.REGISTER}>{t(MSG.AUTH_LOGIN_CREATE_ACCOUNT_LINK)}</Link>
        </>
      }
    >
      <FormError message={error} />
      <form onSubmit={handleSubmit}>
        <Field id="email" label={t(MSG.AUTH_FIELD_EMAIL)}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder={t(MSG.AUTH_FIELD_EMAIL_PLACEHOLDER)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field id="password" label={t(MSG.AUTH_FIELD_PASSWORD)}>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder={t(MSG.AUTH_FIELD_PASSWORD_PLACEHOLDER)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        <RememberMeField
          label={t(MSG.AUTH_REMEMBER_ME)}
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <Button type="submit" fullWidth disabled={submitting}>
          {submitting ? t(MSG.AUTH_LOGIN_SUBMITTING) : t(MSG.AUTH_LOGIN_SUBMIT)}
        </Button>
      </form>
    </AuthCard>
  )
}
