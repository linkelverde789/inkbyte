import AccountHeader from '../components/account/AccountHeader'
import AccountToolbar from '../components/account/AccountToolbar'
import ListGrid from '../components/account/ListGrid'
import { RequireAuth, useAuth } from '../auth'

export default function AccountPage() {
  const { user } = useAuth()
  const displayName = user?.first_name || user?.email?.split('@')[0]

  return (
    <RequireAuth>
      <main className="page-main">
        <div className="wrap">
          <AccountHeader name={displayName} />
          <AccountToolbar />
          <ListGrid />
        </div>
      </main>
    </RequireAuth>
  )
}
