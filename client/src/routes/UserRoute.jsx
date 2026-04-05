import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  const { role, isRoleLoading } = useRole()

  if (loading || (user && isRoleLoading)) return <LoadingSpinner />
  if (user && role === "user") return children
  return <Navigate to='/' state={location.pathname} replace />
}

export default UserRoute;
