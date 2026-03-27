import { FaUserAlt, FaDollarSign } from 'react-icons/fa'
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import LoadingSpinner from '../../Shared/LoadingSpinner'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const fetchDashboardData = async () => {
  const [usersRes, ordersRes] = await Promise.all([
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`),
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`)
  ])

  const users = usersRes.data
  const orders = ordersRes.data

  const totalUsers = users.length
  const ordersPending = orders.filter(o => o.orderStatus !== 'delivered').length
  const ordersDelivered = orders.filter(o => o.orderStatus === 'delivered').length
  const totalRevenue = orders.reduce((acc, o) => acc + (o.price || 0), 0)

  return { totalUsers, ordersPending, ordersDelivered, totalRevenue }
}

const AdminStatistics = () => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData
  })

  if (isLoading) return <LoadingSpinner/>
  if (!summary) return <div>No data available</div>

  const paymentsData = [
    { name: 'Pending', amount: summary.ordersPending },
    { name: 'Delivered', amount: summary.ordersDelivered }
  ]

  const revenueData = [
    { name: 'Revenue', amount: summary.totalRevenue }
  ]

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard icon={<FaDollarSign />} label="Total Revenue" value={`$${summary.totalRevenue}`} bgFrom="orange-600" bgTo="orange-400" />
        <StatCard icon={<BsFillCartPlusFill />} label="Orders Pending" value={summary.ordersPending} bgFrom="blue-600" bgTo="blue-400" />
        <StatCard icon={<BsFillHouseDoorFill />} label="Orders Delivered" value={summary.ordersDelivered} bgFrom="pink-600" bgTo="pink-400" />
        <StatCard icon={<FaUserAlt />} label="Total Users" value={summary.totalUsers} bgFrom="green-600" bgTo="green-400" />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="bg-white shadow-md rounded-xl p-4 xl:col-span-2">
          <h4 className="text-lg font-semibold mb-4">Revenue Overview</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <h4 className="text-lg font-semibold mb-4">Orders Overview</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={paymentsData} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {paymentsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, label, value, bgFrom, bgTo }) => (
  <div className="relative flex flex-col bg-white rounded-xl shadow-md">
    <div className={`absolute -mt-4 mx-4 grid h-16 w-16 place-items-center rounded-xl bg-linear-to-tr from-${bgFrom} to-${bgTo} text-white shadow-lg`}>
      {icon}
    </div>
    <div className="p-4 text-right">
      <p className="text-sm text-blue-gray-600">{label}</p>
      <h4 className="text-2xl font-semibold text-blue-gray-900">{value}</h4>
    </div>
  </div>
)

export default AdminStatistics
