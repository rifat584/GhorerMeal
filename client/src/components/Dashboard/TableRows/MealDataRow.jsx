import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import UpdateMealModal from "../../Modal/UpdateMealModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const MealDataRow = ({ meal, user }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  // mealData
  const {
    chefId,
    chefName,
    estimatedDeliveryTime,
    foodImage,
    foodName,
    ingredients,
    price,
    rating,
    _id,
  } = meal;
  console.log(meal);

  const { mutate: handleMealDelete } = useMutation({
    mutationFn: () =>
      axios.delete(`${import.meta.env.VITE_API_BASE_URL}/meal/${_id}`),
    onSuccess: () => {
      toast.success("Meal has been deleted!");
      queryClient.invalidateQueries({ queryKey: ["myMeals", user?.email] });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={foodImage}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{foodName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{price} TK</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{rating}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{ingredients.join(",")}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">
          {estimatedDeliveryTime.minTime} - {estimatedDeliveryTime.maxTime} mins
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{chefName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{chefId}</p>
      </td>

      {/* delete */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={openModal}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          onConfirm={handleMealDelete}
        />
      </td>

      {/* update */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsEditModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
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
