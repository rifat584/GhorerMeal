import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import {
  DashboardBadge,
  dashboardDangerButtonClassName,
  dashboardTableCellClassName,
} from "../Dashboard/DashboardUI";

const MyReviewForm = ({ review, user }) => {
  const queryClient = useQueryClient();

  const { mutate: handleDeleteReview } = useMutation({
    mutationFn: id =>
      axios.delete(`${import.meta.env.VITE_API_BASE_URL}/review/${id}`),
    onSuccess: () => {
      toast.success("Review removed");
      queryClient.invalidateQueries({ queryKey: ["reviews", user?.email] });
    },
    onError: () => toast.error("Could not delete the review"),
  });

  return (
    <tr className="border-t border-base-300/60">
      <td
        className={`${dashboardTableCellClassName} min-w-[14rem] whitespace-normal`}
      >
        <p className="font-semibold text-base-content">{review.foodName}</p>
      </td>

      <td className={dashboardTableCellClassName}>
        <DashboardBadge tone="warning">{review.rating}/5</DashboardBadge>
      </td>

      <td
        className={`${dashboardTableCellClassName} min-w-[18rem] whitespace-normal`}
      >
        <p className="leading-6 text-base-content/75">{review.comment}</p>
      </td>

      <td className={dashboardTableCellClassName}>
        <p className="text-base-content/75">{review.date.split("T")[0]}</p>
      </td>

      <td className={dashboardTableCellClassName}>
        <button
          type="button"
          onClick={() => handleDeleteReview(review._id)}
          className={dashboardDangerButtonClassName}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MyReviewForm;
