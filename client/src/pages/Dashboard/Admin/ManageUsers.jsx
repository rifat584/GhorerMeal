import { useQuery } from '@tanstack/react-query'
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import useAuth from '../../../hooks/useAuth'
import queryFetch from '../../../utilitis/queryFetch';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { DashboardPage, DashboardTable } from '../../../components/Dashboard/DashboardUI';

const ManageUsers = () => {
  const {user}= useAuth();
  const {data:allUsers, isLoading, refetch}= useQuery(
    {
      queryKey: ['users', user?.email],
      enabled: !!user?.email,
      queryFn: ()=>queryFetch(`users`),
    }
  )
  if(isLoading) return <LoadingSpinner/>

  const totalUsers = allUsers.length
  const chefCount = allUsers.filter(member => member.role === 'chef').length
  const adminCount = allUsers.filter(member => member.role === 'admin').length
  const activeCount = allUsers.filter(member => member.status === 'active').length

  return (
    <DashboardPage
      title='Manage users'
      description='Review member accounts, confirm their current role, and update access when the team structure changes.'
      metrics={[
        { label: 'Total users', value: totalUsers, helper: 'All user accounts currently in the system.', tone: 'primary' },
        { label: 'Chef accounts', value: chefCount, helper: 'Accounts that can publish meals and manage orders.', tone: 'success' },
        { label: 'Admin accounts', value: adminCount, helper: 'Accounts with elevated platform access.', tone: 'warning' },
        { label: 'Active status', value: activeCount, helper: 'Accounts currently marked active.', tone: 'neutral' },
      ]}
    >
      <DashboardTable
        title='Member list'
        countLabel='User'
        columns={['Member', 'Role', 'Status', 'Actions']}
        rowCount={allUsers.length}
        emptyTitle='No users found'
        emptyDescription='New members will show up here after they create accounts.'
      >
        {allUsers.map(user => (
          <UserDataRow user={user} key={user._id} refetch={refetch} />
        ))}
      </DashboardTable>
    </DashboardPage>
  )
}

export default ManageUsers
