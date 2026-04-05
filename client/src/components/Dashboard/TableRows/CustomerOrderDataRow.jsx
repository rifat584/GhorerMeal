import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import {
  DashboardBadge,
  dashboardActionButtonClassName,
  dashboardTableCellClassName,
} from "../DashboardUI";

const statusTone = {
  pending: "warning",
  accepted: "primary",
  delivered: "success",
  cancelled: "danger",
};

const formatDate = dateValue => dateValue?.split("T")[0] || "No date";
const paymentTone = {
  pending: "warning",
  paid: "success",
};

const formatTrackingDate = dateValue => {
  if (!dateValue) return null;

  return new Date(dateValue).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const getTrackingSummary = order => {
  if (order.orderStatus === "cancelled") {
    return "This order was cancelled before delivery.";
  }

  if (order.orderStatus === "delivered") {
    return "Delivered successfully.";
  }

  if (order.orderStatus === "accepted" && order.paymentStatus === "paid") {
    return "Payment completed. Waiting for final delivery.";
  }

  if (order.orderStatus === "accepted") {
    return "Chef accepted the order. Payment is still needed.";
  }

  return "Order placed and waiting for chef confirmation.";
};

const getTrackingSteps = order => [
  { label: "Placed", time: order.orderTime, isComplete: true },
  {
    label: "Accepted",
    time: order.acceptedTime,
    isComplete:
      order.orderStatus === "accepted" || order.orderStatus === "delivered",
  },
  {
    label: "Paid",
    time: order.paymentTime,
    isComplete: order.paymentStatus === "paid",
  },
  {
    label: "Delivered",
    time: order.deliveredTime,
    isComplete: order.orderStatus === "delivered",
  },
];

const CustomerOrderDataRow = ({ order }) => {
  const canPayNow =
    order.orderStatus === "accepted" && order.paymentStatus !== "paid";
  const trackingSteps = getTrackingSteps(order);

  const { mutate: handlePayment } = useMutation({
    mutationFn: () =>
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/create-checkout-session`,
        { _id: order._id }
      ),
    onSuccess: response => {
      window.location.href = response.data.url;
    },
    onError: error => {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Could not start payment"
      );
    },
  });

  return (
    <tr className="border-t border-base-300/60">
      <td
        className={`${dashboardTableCellClassName} min-w-[14rem] whitespace-normal`}
      >
        <p className="font-semibold text-base-content">{order.mealName}</p>
        <p className="mt-1 text-sm text-base-content/60">
          Quantity {order.quantity} · {order.price} TK
        </p>
      </td>

      <td className={dashboardTableCellClassName}>
        <p className="text-base-content/75">
          {order.estimatedDeliveryTime?.minTime} -{" "}
          {order.estimatedDeliveryTime?.maxTime} mins
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-base-content/45">
          Ordered {formatDate(order.orderTime)}
        </p>
      </td>

      <td className={dashboardTableCellClassName}>
        <p className="font-medium text-base-content">{order.chefName}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-base-content/45">
          {order.chefId}
        </p>
      </td>

      <td className={dashboardTableCellClassName}>
       <DashboardBadge tone={statusTone[order.orderStatus] || "neutral"}>
            {order.orderStatus}
          </DashboardBadge>
      </td>

      <td className={dashboardTableCellClassName}>
        {order.orderStatus === "cancelled" ? (
          <div className="min-w-[13rem] space-y-2">
            <DashboardBadge tone="danger">Cancelled</DashboardBadge>
            <p className="text-xs leading-6 text-base-content/55">
              {getTrackingSummary(order)}
            </p>
          </div>
        ) : (
          <div className="min-w-[13rem] space-y-2">
            {trackingSteps.map(step => (
              <div key={step.label} className="flex items-center gap-2 text-xs">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    step.isComplete ? "bg-primary" : "bg-base-300"
                  }`}
                />
                <span
                  className={
                    step.isComplete
                      ? "font-medium text-base-content"
                      : "text-base-content/50"
                  }
                >
                  {step.label}
                </span>
                {step.time && (
                  <span className="text-base-content/40">
                    {formatTrackingDate(step.time)}
                  </span>
                )}
              </div>
            ))}
            <p className="pt-1 text-xs leading-6 text-base-content/55">
              {getTrackingSummary(order)}
            </p>
          </div>
        )}
      </td>

      <td className={dashboardTableCellClassName}>
          <DashboardBadge tone={paymentTone[order.paymentStatus] || "neutral"}>
            {order.paymentStatus}
          </DashboardBadge>
      </td>

      <td className={dashboardTableCellClassName}>
        <button
          onClick={handlePayment}
          className={dashboardActionButtonClassName}
          disabled={!canPayNow}
        >
          Pay now
        </button>
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
