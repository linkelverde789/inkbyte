import AccountHeader from '../components/account/AccountHeader'
import AccountToolbar from '../components/account/AccountToolbar'
import ListGrid from '../components/account/ListGrid'
import SessionInfo from '../components/account/SessionInfo'
import { RequireAuth, useAuth, useLogout } from '../auth'

export default function AccountPage() {
  const { user } = useAuth()
  const logout = useLogout()
  const displayName = user?.first_name || user?.email?.split('@')[0]

  return (
    <RequireAuth>
      <main className="page-main">
        <div className="wrap">
          <AccountHeader name={displayName} />
          <AccountToolbar />
          <ListGrid />
          <SessionInfo email={user.email} onLogout={() => logout()} />
        </div>
      </main>
    </RequireAuth>
  )
}
