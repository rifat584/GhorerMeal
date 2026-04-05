import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import { DashboardPage } from '../../../components/Dashboard/DashboardUI'

const Statistics = () => {
  return (
    <DashboardPage
      title='Platform statistics'
      description='Use this overview to check platform activity, follow revenue, and see how current orders are moving through the system.'
    >
      <AdminStatistics />
    </DashboardPage>
  )
}

export default Statistics
