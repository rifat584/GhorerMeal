import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import queryFetch from "../../../utilitis/queryFetch";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  DashboardBadge,
  DashboardPage,
  DashboardPanel,
  DashboardTable,
} from "../../../components/Dashboard/DashboardUI";

const getOrderUpdateTime = order =>
  order.updatedAt ||
  order.deliveredTime ||
  order.cancelledTime ||
  order.paymentTime ||
  order.acceptedTime ||
  order.orderTime;

const formatUpdateTime = dateValue =>
  new Date(dateValue).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const getCustomerNotification = order => {
  if (order.orderStatus === "cancelled") {
    return {
      title: `${order.mealName} was cancelled`,
      detail: "This order was cancelled before it could move to delivery.",
      tone: "danger",
    };
  }

  if (order.orderStatus === "delivered") {
    return {
      title: `${order.mealName} was delivered`,
      detail: "This order has been marked complete by the chef.",
      tone: "success",
    };
  }

  if (order.orderStatus === "accepted" && order.paymentStatus === "paid") {
    return {
      title: `${order.mealName} is moving toward delivery`,
      detail: "Payment is complete and the chef can finish the order.",
      tone: "primary",
    };
  }

  if (order.orderStatus === "accepted") {
    return {
      title: `${order.mealName} is waiting for payment`,
      detail: "The chef accepted this order. You can pay now to keep it moving.",
      tone: "warning",
    };
  }

  return {
    title: `${order.mealName} is waiting for chef confirmation`,
    detail: "The order has been placed and is still waiting for a response.",
    tone: "neutral",
  };
};

const MyOrders = () => {
  const { user } = useAuth();
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const { data: orderData = [], isLoading } = useQuery({
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
  const sortedUpdates = [...orderData]
    .sort(
      (firstOrder, secondOrder) =>
        new Date(getOrderUpdateTime(secondOrder)) -
        new Date(getOrderUpdateTime(firstOrder))
    )
  const hasMoreUpdates = sortedUpdates.length > 4
  const recentUpdates = showAllUpdates ? sortedUpdates : sortedUpdates.slice(0, 4)

  return (
    <DashboardPage
      title="My orders"
      description="Track what changed most recently, see which orders still need action, and follow each meal from placement to delivery."
      metrics={[
        { label: "Total orders", value: totalOrders, tone: "primary" },
        { label: "Paid orders", value: paidOrders, tone: "success" },
        { label: "Need payment", value: duePayment, tone: "warning" },
        { label: "Active delivery", value: activeDelivery, tone: "neutral" },
      ]}
    >
      <DashboardPanel
        title="Recent updates"
        action={
          hasMoreUpdates ? (
            <button
              type="button"
              onClick={() => setShowAllUpdates(currentValue => !currentValue)}
              className="btn btn-ghost rounded-full border border-base-300 bg-base-100 px-4 text-sm font-medium"
            >
              {showAllUpdates ? "Show less" : "Show more"}
            </button>
          ) : null
        }
      >
        {recentUpdates.length > 0 ? (
          <div className="space-y-3">
            {recentUpdates.map(order => {
              const notification = getCustomerNotification(order)

              return (
                <article
                  key={order._id}
                  className="rounded-2xl border border-base-300/70 bg-base-200/35 px-4 py-3"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <DashboardBadge tone={notification.tone}>
                        {order.orderStatus}
                      </DashboardBadge>
                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-semibold text-base-content md:text-base">
                          {notification.title}
                        </h2>
                        <p className="truncate text-sm text-base-content/60">
                          {notification.detail}
                        </p>
                      </div>
                    </div>
                    <p className="shrink-0 text-xs uppercase tracking-[0.18em] text-base-content/45">
                      {formatUpdateTime(getOrderUpdateTime(order))}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <p className="text-sm leading-7 text-base-content/68">
            Once you place an order, updates from the chef and payment flow will
            appear here.
          </p>
        )}
      </DashboardPanel>

      <DashboardTable
        title="Order history"
        columns={[
          "Meal",
          "Delivery",
          "Chef",
          "Status",
          "Tracking",
          "Payment",
          "Actions",
        ]}
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
