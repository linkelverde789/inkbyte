export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  fullWidth = false,
  disabled = false,
  ...props
}) {
  const classes = ['btn', `btn-${variant}`, className, fullWidth ? 'btn--full' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
