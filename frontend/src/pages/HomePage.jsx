import HeroSection from '../components/home/HeroSection'
import { useAuth } from '../auth'

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <main className="page-main">
      <HeroSection isAuthenticated={isAuthenticated} />
    </main>
  )
}
