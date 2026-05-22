export default function TopBanner({ children }) {
  if (!children) {
    return null
  }
  return <div className="banner-top">{children}</div>
}
