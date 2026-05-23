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

const INITIAL_FORM = {
  email: '',
  password: '',
  password_confirm: '',
  first_name: '',
  last_name: '',
  remember_me: true,
}

export default function RegisterForm({ onSuccess }) {
  const { register } = useAuth()
  const [form, setForm] = useState(INITIAL_FORM)

  const { error, submitting, handleSubmit } = useAuthForm(async () => {
    await register(form)
    onSuccess?.()
  })

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <AuthCard
      title={t(MSG.AUTH_REGISTER_TITLE)}
      description={t(MSG.AUTH_REGISTER_DESCRIPTION)}
      footer={
        <>
          {t(MSG.AUTH_REGISTER_HAS_ACCOUNT)}{' '}
          <Link to={ROUTES.LOGIN}>{t(MSG.AUTH_REGISTER_SIGN_IN_LINK)}</Link>
        </>
      }
    >
      <FormError message={error} />
      <form onSubmit={handleSubmit}>
        <Field id="first_name" label={t(MSG.AUTH_FIELD_FIRST_NAME)}>
          <input
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            placeholder={t(MSG.AUTH_FIELD_FIRST_NAME_PLACEHOLDER)}
            value={form.first_name}
            onChange={(e) => updateField('first_name', e.target.value)}
          />
        </Field>
        <Field id="email" label={t(MSG.AUTH_FIELD_EMAIL)}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t(MSG.AUTH_FIELD_EMAIL_PLACEHOLDER)}
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            required
          />
        </Field>
        <Field id="password" label={t(MSG.AUTH_FIELD_PASSWORD)}>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder={t(MSG.AUTH_FIELD_PASSWORD_MIN_PLACEHOLDER)}
            value={form.password}
            onChange={(e) => updateField('password', e.target.value)}
            required
            minLength={8}
          />
        </Field>
        <Field id="password_confirm" label={t(MSG.AUTH_FIELD_PASSWORD_CONFIRM)}>
          <input
            id="password_confirm"
            name="password_confirm"
            type="password"
            autoComplete="new-password"
            value={form.password_confirm}
            onChange={(e) => updateField('password_confirm', e.target.value)}
            required
            minLength={8}
          />
        </Field>
        <RememberMeField
          label={t(MSG.AUTH_REMEMBER_ME)}
          checked={form.remember_me}
          onChange={(e) => updateField('remember_me', e.target.checked)}
        />
        <Button type="submit" fullWidth disabled={submitting}>
          {submitting
            ? t(MSG.AUTH_REGISTER_SUBMITTING)
            : t(MSG.AUTH_REGISTER_SUBMIT)}
        </Button>
      </form>
    </AuthCard>
  )
}
