import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import uploadImage from "../../utilitis/uploadImage";

const inputClassName =
  "w-full rounded-2xl border border-base-300 bg-base-100 px-4 py-3 text-sm text-base-content outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10";

const UpdateMealForm = ({ meal, closeModal }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      foodName: meal.foodName,
      description: meal.description || '',
      ingredients: meal.ingredients.join(", "),
      price: meal.price,
      minTime: meal.estimatedDeliveryTime.minTime,
      maxTime: meal.estimatedDeliveryTime.maxTime,
    },
  });

  const submitUpdateMeal = async data => {
    try {
      const updatedImage = data.image?.[0]
        ? await uploadImage(data.image)
        : meal.foodImage;

      const updatedMeal = {
        foodName: data.foodName,
        description: data.description.trim(),
        ingredients: data.ingredients
          .split(",")
          .map(item => item.trim())
          .filter(Boolean),
        price: Number(data.price),
        estimatedDeliveryTime: {
          minTime: Number(data.minTime),
          maxTime: Number(data.maxTime),
        },
        foodImage: updatedImage,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/meal/${meal?._id}`,
        updatedMeal
      );

      if (response.data.modifiedCount > 0) {
        toast.success("Meal updated successfully");
        queryClient.invalidateQueries({ queryKey: ["myMeals"] });
        closeModal();
      }
    } catch {
      toast.error("Could not update the meal");
    }
  };

  return (
    <div className="w-full rounded-[1.5rem] bg-base-200/45 p-5 text-base-content">
      <form onSubmit={handleSubmit(submitUpdateMeal)} className="grid gap-6">
        <div className="space-y-2 text-sm">
          <label className="font-medium text-base-content/75">Food name</label>
          <input
            {...register("foodName", { required: true })}
            className={inputClassName}
          />
        </div>

        <div className="space-y-2 text-sm">
          <label className="font-medium text-base-content/75">
            Ingredients (comma separated)
          </label>
          <textarea
            {...register("ingredients")}
            className={`${inputClassName} min-h-28`}
          />
        </div>

        <div className="space-y-2 text-sm">
          <label className="font-medium text-base-content/75">
            Product description
          </label>
          <textarea
            {...register("description")}
            className={`${inputClassName} min-h-28`}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 text-sm">
            <label className="font-medium text-base-content/75">Price</label>
            <input
              type="number"
              {...register("price", { required: true, valueAsNumber: true })}
              className={inputClassName}
            />
          </div>

          <div className="space-y-2 text-sm">
            <label className="font-medium text-base-content/75">
              Delivery range
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Min"
                {...register("minTime", { valueAsNumber: true })}
                className={inputClassName}
              />
              <input
                type="number"
                placeholder="Max"
                {...register("maxTime", { valueAsNumber: true })}
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-dashed border-base-300 bg-base-100 p-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              hidden
              {...register("image")}
            />
            <div className="btn btn-outline rounded-full">
              Replace image (optional)
            </div>
          </label>

          <p className="mt-2 text-xs leading-6 text-base-content/60">
            Current image will be kept if no new image is uploaded.
          </p>
        </div>

        <button type="submit" className="btn btn-primary w-full rounded-full">
          Update meal
        </button>
      </form>
    </div>
  );
};

export default UpdateMealForm;
