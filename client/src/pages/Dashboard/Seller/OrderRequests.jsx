import { useQuery } from '@tanstack/react-query'
import SellerOrderDataRow from '../../../components/Dashboard/TableRows/SellerOrderDataRow'
import useAuth from '../../../hooks/useAuth'
import queryFetch from '../../../utilitis/queryFetch'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import {
  DashboardPage,
  DashboardTable,
} from '../../../components/Dashboard/DashboardUI'

const OrderRequests = () => {
  const {user}= useAuth()

  const { data: userData } = useQuery({
  queryKey: ['user', user?.email],
  enabled: !!user?.email,
  queryFn: () => queryFetch(`user/${user?.email}`),
});

const chefId = userData?.chefId;

const { data: orders = [], isLoading } = useQuery({
  queryKey: ['orders', chefId],
  enabled: !!chefId,
  queryFn: () => queryFetch(`order/chef/${chefId}`),
});
if(isLoading) return <LoadingSpinner/>

  const getActionPriority = order => {
    if (order.orderStatus === 'pending') return 0
    if (order.orderStatus === 'accepted' && order.paymentStatus === 'paid') return 1
    if (order.orderStatus === 'accepted') return 2
    return 3
  }

  const sortedOrders = [...orders].sort((firstOrder, secondOrder) => {
    const priorityDifference =
      getActionPriority(firstOrder) - getActionPriority(secondOrder)

    if (priorityDifference !== 0) {
      return priorityDifference
    }

    return new Date(secondOrder.orderTime) - new Date(firstOrder.orderTime)
  })

  const totalOrders = orders.length
  const pendingOrders = orders.filter(order => order.orderStatus === 'pending').length
  const acceptedOrders = orders.filter(order => order.orderStatus === 'accepted').length
  const deliveredOrders = orders.filter(order => order.orderStatus === 'delivered').length

  return (
    <DashboardPage
      title='Order requests'
      description='Track incoming customer orders, move the right requests into delivery, and keep customers updated with clear status changes.'
      metrics={[
        { label: 'Total requests', value: totalOrders, helper: 'Every order currently tied to your chef account.', tone: 'primary' },
        { label: 'Pending', value: pendingOrders, helper: 'Orders still waiting for your response.', tone: 'warning' },
        { label: 'Accepted', value: acceptedOrders, helper: 'Orders that are currently in progress.', tone: 'success' },
        { label: 'Delivered', value: deliveredOrders, helper: 'Orders marked complete from this dashboard.', tone: 'neutral' },
      ]}
    >
      <DashboardTable
        title='Customer orders'
        countLabel='Order'
        columns={['Customer', 'Meal', 'Amount', 'Delivery', 'Status', 'Payment', 'Actions']}
        rowCount={sortedOrders.length}
        emptyTitle='No order requests yet'
        emptyDescription='New orders will show up here once customers start buying meals from your chef profile.'
      >
        {sortedOrders.map(order => (
          <SellerOrderDataRow order={order} key={order._id} />
        ))}
      </DashboardTable>
    </DashboardPage>
  )
}

export default OrderRequests
