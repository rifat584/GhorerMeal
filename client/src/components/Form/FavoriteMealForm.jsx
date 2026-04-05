import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  dashboardDangerButtonClassName,
  dashboardTableCellClassName,
} from "../Dashboard/DashboardUI";

const FavoriteMealForm = ({ favorite }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: id =>
      axios.delete(`${import.meta.env.VITE_API_BASE_URL}/favorite/${id}`),
    onSuccess: data => {
      if (data.data.deletedCount > 0) {
        toast.success("Meal removed from favorites");
        queryClient.invalidateQueries({ queryKey: ["favoriteMeal"] });
      }
    },
    onError: () => toast.error("Could not remove the meal"),
  });

  return (
    <tr className="border-t border-base-300/60">
      <td
        className={`${dashboardTableCellClassName} min-w-[15rem] whitespace-normal`}
      >
        <p className="font-semibold text-base-content">{favorite.mealName}</p>
        <p className="mt-1 text-sm text-base-content/60">{favorite.price} TK</p>
      </td>

      <td className={dashboardTableCellClassName}>
        <p className="text-base-content/75">{favorite.chefName}</p>
      </td>

      <td className={dashboardTableCellClassName}>
        <p className="text-base-content/75">{favorite.addedTime.split("T")[0]}</p>
      </td>

      <td className={dashboardTableCellClassName}>
        <button
          type="button"
          onClick={() => mutate(favorite._id)}
          className={dashboardDangerButtonClassName}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default FavoriteMealForm;
