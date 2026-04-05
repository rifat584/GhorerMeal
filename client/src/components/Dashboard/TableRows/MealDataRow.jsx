import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteModal from "../../Modal/DeleteModal";
import UpdateMealModal from "../../Modal/UpdateMealModal";
import {
  dashboardDangerButtonClassName,
  dashboardSecondaryButtonClassName,
  dashboardTableCellClassName,
} from "../DashboardUI";

const MealDataRow = ({ meal, user }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: handleMealDelete } = useMutation({
    mutationFn: () =>
      axios.delete(`${import.meta.env.VITE_API_BASE_URL}/meal/${meal._id}`),
    onSuccess: () => {
      toast.success("Meal deleted");
      queryClient.invalidateQueries({ queryKey: ["myMeals", user?.email] });
    },
    onError: () => toast.error("Could not delete the meal"),
  });

  return (
    <tr className="border-t border-base-300/60">
      <td className={dashboardTableCellClassName}>
        <div className="flex min-w-[16rem] items-center gap-4">
          <img
            alt={meal.foodName}
            src={meal.foodImage}
            className="h-16 w-16 rounded-2xl object-cover"
          />
          <div className="space-y-1">
            <p className="font-semibold text-base-content">{meal.foodName}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-base-content/45">
              Published meal
            </p>
          </div>
        </div>
      </td>

      <td className={dashboardTableCellClassName}>
        <p className="font-semibold text-base-content">{meal.price} TK</p>
      </td>

      <td className={dashboardTableCellClassName}>
        <p className="font-semibold text-base-content">{meal.rating}/5</p>
      </td>

      <td
        className={`${dashboardTableCellClassName} min-w-[15rem] whitespace-normal`}
      >
        <p className="leading-6 text-base-content/70">
          {meal.ingredients.join(", ")}
        </p>
      </td>

      <td className={dashboardTableCellClassName}>
        <p className="text-base-content/75">
          {meal.estimatedDeliveryTime.minTime} -{" "}
          {meal.estimatedDeliveryTime.maxTime} mins
        </p>
      </td>

      <td className={dashboardTableCellClassName}>
        <p className="font-medium text-base-content">{meal.chefName}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-base-content/45">
          {meal.chefId}
        </p>
      </td>

      <td className={dashboardTableCellClassName}>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className={dashboardSecondaryButtonClassName}
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className={dashboardDangerButtonClassName}
          >
            Delete
          </button>
        </div>

        <DeleteModal
          isOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
          onConfirm={handleMealDelete}
        />

        <UpdateMealModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          meal={meal}
        />
      </td>
    </tr>
  );
};

export default MealDataRow;
