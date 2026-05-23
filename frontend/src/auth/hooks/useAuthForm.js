import { useState } from 'react'

/**
 * @param {() => Promise<void>} onSubmit
 */
export function useAuthForm(onSubmit) {
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await onSubmit()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return { error, submitting, handleSubmit, setError }
}
