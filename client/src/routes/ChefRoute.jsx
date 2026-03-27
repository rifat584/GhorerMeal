import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

const ChefRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  const role = useRole();
  if (loading) return <LoadingSpinner />
  if (user && role==="chef") return children
  return <Navigate to='/' state={location.pathname} replace='true' />
}

export default ChefRoute;
