import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import {
  DashboardEmptyState,
  DashboardPanel,
} from "../DashboardUI";

const chartColors = ["#8dbb3c", "#c86a48"];

const fetchDashboardData = async () => {
  const [usersResponse, ordersResponse] = await Promise.all([
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`),
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`),
  ]);

  const users = usersResponse.data;
  const orders = ordersResponse.data;

  return {
    totalUsers: users.length,
    ordersPending: orders.filter(order => order.orderStatus !== "delivered")
      .length,
    ordersDelivered: orders.filter(order => order.orderStatus === "delivered")
      .length,
    totalRevenue: orders.reduce(
      (total, order) => total + Number(order.price || 0),
      0
    ),
  };
};

const AdminStatistics = () => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!summary) {
    return (
      <DashboardEmptyState
        title="No dashboard data available"
        description="Statistics will appear here once the platform has enough users and orders to summarize."
      />
    );
  }

  const ordersData = [
    { name: "Pending", amount: summary.ordersPending },
    { name: "Delivered", amount: summary.ordersDelivered },
  ];

  const revenueData = [{ name: "Revenue", amount: summary.totalRevenue }];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
      <DashboardPanel
        title="Revenue overview"
        description="A quick look at how much paid order value has moved through the platform so far."
      >
        <div className="h-[19rem]">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="amount" fill="#c86a48" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.25rem] bg-base-200/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
              Total revenue
            </p>
            <p className="mt-3 text-3xl font-semibold text-base-content">
              {summary.totalRevenue} TK
            </p>
          </div>

          <div className="rounded-[1.25rem] bg-base-200/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
              Orders pending
            </p>
            <p className="mt-3 text-3xl font-semibold text-base-content">
              {summary.ordersPending}
            </p>
          </div>

          <div className="rounded-[1.25rem] bg-base-200/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
              Orders delivered
            </p>
            <p className="mt-3 text-3xl font-semibold text-base-content">
              {summary.ordersDelivered}
            </p>
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel
        title="Order split"
        description="A cleaner view of how many orders still need attention versus how many are already complete."
      >
        <div className="h-[19rem]">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ordersData}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {ordersData.map((entry, index) => (
                  <Cell
                    key={`${entry.name}-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 rounded-[1.25rem] bg-base-200/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
            Total users
          </p>
          <p className="mt-3 text-3xl font-semibold text-base-content">
            {summary.totalUsers}
          </p>
          <p className="mt-2 text-sm leading-7 text-base-content/65">
            The current member count includes customers, chefs, and admins.
          </p>
        </div>
      </DashboardPanel>
    </div>
  );
};

export default AdminStatistics;
