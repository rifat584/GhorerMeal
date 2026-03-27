import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  const role = useRole();
  if (loading) return <LoadingSpinner />
  if (user && role==="admin") return children
  return <Navigate to='/' state={location.pathname} replace='true' />
}

export default AdminRoute;
