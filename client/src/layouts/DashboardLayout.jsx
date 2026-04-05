import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet, Link, useLocation } from 'react-router'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import useAuth from '../hooks/useAuth'
import queryFetch from '../utilitis/queryFetch'
import LoadingSpinner from '../components/Shared/LoadingSpinner'

const DashboardLayout = () => {
  const location = useLocation()
  const { user } = useAuth()
  const { data: userData, isLoading } = useQuery({
    queryKey: ['dashboardUser', user?.email],
    enabled: !!user?.email,
    queryFn: () => queryFetch(`user/${user?.email}`),
  })

  const dashboardHomeByRole = {
    admin: '/dashboard/stat',
    chef: '/dashboard/my-meals',
    user: '/dashboard/my-orders',
  }

  if (location.pathname === '/dashboard/') {
    if (isLoading) return <LoadingSpinner />

    return (
      <Navigate
        to={dashboardHomeByRole[userData?.role] || '/dashboard/profile'}
        replace
      />
    )
  }

  return (
    <div className='min-h-screen bg-base-200/60 text-base-content'>
      <Sidebar />
      <div className='lg:pl-[18.5rem]'>
        <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-8'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
