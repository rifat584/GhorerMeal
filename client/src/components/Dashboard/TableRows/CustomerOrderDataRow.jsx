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

const CustomerOrderDataRow = ({ order }) => {
  const canPayNow =
    order.orderStatus === "accepted" && order.paymentStatus !== "paid";

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
        
          <DashboardBadge tone={statusTone[order.paymentStatus] || "neutral"}>
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
