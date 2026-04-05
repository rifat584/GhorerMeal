import { useQuery } from '@tanstack/react-query'
import SellerOrderDataRow from '../../../components/Dashboard/TableRows/SellerOrderDataRow'
import useAuth from '../../../hooks/useAuth'
import queryFetch from '../../../utilitis/queryFetch'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import {
  DashboardBadge,
  DashboardPage,
  DashboardPanel,
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
  const waitingForPayment = orders.filter(
    order => order.orderStatus === 'accepted' && order.paymentStatus !== 'paid'
  ).length
  const readyToDeliver = orders.filter(
    order => order.orderStatus === 'accepted' && order.paymentStatus === 'paid'
  ).length

  const attentionItems = [
    {
      label: 'New orders',
      value: pendingOrders,
      detail: 'These customers are still waiting for your response.',
      tone: 'warning',
    },
    {
      label: 'Ready to deliver',
      value: readyToDeliver,
      detail: 'Payment is done, so these meals can move to delivery.',
      tone: 'success',
    },
    {
      label: 'Waiting for payment',
      value: waitingForPayment,
      detail: 'You already accepted these orders, but customers still need to pay.',
      tone: 'primary',
    },
  ].filter(item => item.value > 0)

  return (
    <DashboardPage
      title='Order requests'
      description='Handle new orders first, keep an eye on what is ready for delivery, and use the current order status as your daily update feed.'
      metrics={[
        { label: 'Total requests', value: totalOrders, tone: 'primary' },
        { label: 'Pending', value: pendingOrders, tone: 'warning' },
        { label: 'Accepted', value: acceptedOrders, tone: 'success' },
        { label: 'Delivered', value: deliveredOrders, tone: 'neutral' },
      ]}
    >
      <DashboardPanel title='Needs attention'>
        {attentionItems.length > 0 ? (
          <div className='grid gap-3 lg:grid-cols-3'>
            {attentionItems.map(item => (
              <article
                key={item.label}
                className='rounded-[1.5rem] border border-base-300/70 bg-base-200/45 p-4'
              >
                <DashboardBadge tone={item.tone}>{item.label}</DashboardBadge>
                <p className='mt-4 text-3xl font-semibold tracking-tight text-base-content'>
                  {item.value}
                </p>
                <p className='mt-2 text-sm leading-7 text-base-content/68'>
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className='text-sm leading-7 text-base-content/68'>
            Nothing urgent right now. New orders, paid deliveries, and payment delays
            will show up here automatically.
          </p>
        )}
      </DashboardPanel>

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
