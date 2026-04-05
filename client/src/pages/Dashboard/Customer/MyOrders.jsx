import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import queryFetch from "../../../utilitis/queryFetch";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { DashboardPage, DashboardTable } from "../../../components/Dashboard/DashboardUI";

const MyOrders = () => {
  const { user } = useAuth();
  const { data: orderData, isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: () => queryFetch(`order/${user?.email}`),
  });
  if (isLoading) return <LoadingSpinner />;

  const totalOrders = orderData.length
  const paidOrders = orderData.filter(order => order.paymentStatus === "paid").length
  const duePayment = orderData.filter(
    order => order.orderStatus === "accepted" && order.paymentStatus !== "paid"
  ).length
  const activeDelivery = orderData.filter(
    order => order.orderStatus === "pending" || order.orderStatus === "accepted"
  ).length

  return (
    <DashboardPage
      title="My orders"
      description="Follow each order from payment to delivery and keep an eye on anything that still needs action from you."
      metrics={[
        { label: "Total orders", value: totalOrders, helper: "Every order placed from your account.", tone: "primary" },
        { label: "Paid orders", value: paidOrders, helper: "Orders that already completed payment.", tone: "success" },
        { label: "Need payment", value: duePayment, helper: "Orders that still require payment before completion.", tone: "warning" },
        { label: "Active delivery", value: activeDelivery, helper: "Orders that are still pending or in progress.", tone: "neutral" },
      ]}
    >
      <DashboardTable
        title="Order history"
        columns={["Meal", "Delivery", "Chef", "Status", "Payment", "Actions"]}
        rowCount={orderData.length}
        emptyTitle="No orders yet"
        emptyDescription="Once you order a meal, the full order history will show up here."
      >
        {orderData.map(order => (
          <CustomerOrderDataRow order={order} key={order._id} />
        ))}
      </DashboardTable>
    </DashboardPage>
  );
};

export default MyOrders;
