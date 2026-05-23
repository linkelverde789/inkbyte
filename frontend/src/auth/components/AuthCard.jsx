export default function AuthCard({ title, description, children, footer }) {
  return (
    <main className="auth-main">
      <div className="auth-card">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children}
        {footer && <p className="auth-foot">{footer}</p>}
      </div>
    </main>
  )
}
