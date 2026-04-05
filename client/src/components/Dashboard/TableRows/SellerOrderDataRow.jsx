import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import {
  DashboardBadge,
  dashboardActionButtonClassName,
  dashboardDangerButtonClassName,
  dashboardSecondaryButtonClassName,
  dashboardTableCellClassName,
} from "../DashboardUI";

const statusTone = {
  pending: "warning",
  accepted: "primary",
  delivered: "success",
  cancelled: "danger",
};

const formatDate = dateValue => dateValue?.split("T")[0] || "No date";

const SellerOrderDataRow = ({ order }) => {
  const queryClient = useQueryClient();
  const isPendingOrder = order.orderStatus === "pending";
  const isAcceptedOrder = order.orderStatus === "accepted";
  const isPaidOrder = order.paymentStatus === "paid";
  const canAcceptOrder = isPendingOrder;
  const canCancelOrder = isPendingOrder;
  const canDeliverOrder = isAcceptedOrder && isPaidOrder;
  const isWaitingForPayment = isAcceptedOrder && !isPaidOrder;
  const hasNoActions =
    order.orderStatus === "delivered" || order.orderStatus === "cancelled";

  const { mutate: handleOrderStatus, isPending: isUpdatingOrder } = useMutation({
    mutationFn: nextStatus =>
      axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/order/change-status/${order._id}?status=${nextStatus}`
      ),
    onSuccess: (_, nextStatus) => {
      const successMessage = {
        accepted: "Order accepted",
        delivered: "Order marked as delivered",
        cancelled: "Order cancelled",
      };

      toast.success(successMessage[nextStatus] || "Order updated");
      queryClient.invalidateQueries({ queryKey: ["orders", order.chefId] });
    },
    onError: error =>
      toast.error(
        error.response?.data?.message || "Could not update the order"
      ),
  });

  return (
    <tr className="border-t border-base-300/60">
      <td
        className={`${dashboardTableCellClassName} min-w-[16rem] whitespace-normal`}
      >
        <p className="font-semibold text-base-content">{order.userEmail}</p>
        <p className="mt-1 text-sm leading-6 text-base-content/60">
          {order.userAddress}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-base-content/45">
          Ordered {formatDate(order.orderTime)}
        </p>
      </td>

      <td
        className={`${dashboardTableCellClassName} min-w-[14rem] whitespace-normal`}
      >
        <p className="font-semibold text-base-content">{order.mealName}</p>
        <p className="mt-1 text-sm text-base-content/60">
          Quantity {order.quantity}
        </p>
      </td>

      <td className={dashboardTableCellClassName}>
        <p className="font-semibold text-base-content">{order.price} TK</p>
      </td>

      <td className={dashboardTableCellClassName}>
        <p className="text-base-content/75">
          {order.estimatedDeliveryTime?.minTime} -{" "}
          {order.estimatedDeliveryTime?.maxTime} mins
        </p>
      </td>

      <td className={dashboardTableCellClassName}>
        <DashboardBadge tone={statusTone[order.orderStatus] || "neutral"}>
          {order.orderStatus}
        </DashboardBadge>
      </td>

      <td className={dashboardTableCellClassName}>
        <DashboardBadge
          tone={order.paymentStatus === "paid" ? "success" : "warning"}
        >
          {order.paymentStatus}
        </DashboardBadge>
      </td>

      <td className={dashboardTableCellClassName}>
        <div className="flex flex-wrap gap-2">
          {canAcceptOrder && (
            <button
              className={dashboardActionButtonClassName}
              disabled={isUpdatingOrder}
              onClick={() => handleOrderStatus("accepted")}
            >
              Accept
            </button>
          )}

          {canDeliverOrder && (
            <button
              className={dashboardSecondaryButtonClassName}
              disabled={isUpdatingOrder}
              onClick={() => handleOrderStatus("delivered")}
            >
              Deliver
            </button>
          )}

          {canCancelOrder && (
            <button
              className={dashboardDangerButtonClassName}
              disabled={isUpdatingOrder}
              onClick={() => handleOrderStatus("cancelled")}
            >
              Cancel
            </button>
          )}

          {isWaitingForPayment && (
            <p className="text-xs font-medium text-base-content/55">
              Waiting for payment
            </p>
          )}

          {hasNoActions && (
            <p className="text-xs font-medium text-base-content/55">
              No actions available
            </p>
          )}
        </div>
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
