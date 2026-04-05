import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import queryFetch from "../../utilitis/queryFetch";
import uploadImage from "../../utilitis/uploadImage";

const inputClassName =
  "w-full rounded-2xl border border-base-300 bg-base-100 px-4 py-3 text-sm text-base-content outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10";

const readOnlyClassName =
  "w-full rounded-2xl border border-base-300 bg-base-200/70 px-4 py-3 text-sm text-base-content/70";

const CreateMealForm = () => {
  const { user } = useAuth();
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => queryFetch(`user/${user?.email}`),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleMealSubmit = async formData => {
    const deliveryTimeParts = formData.estimatedDeliveryTime.split("-");
    const minTime = Number(deliveryTimeParts[0]);
    const maxTime = Number(deliveryTimeParts[1].trim());

    try {
      const foodImage = await uploadImage(formData.foodImage);

      const mealData = {
        foodName: formData.foodName,
        description: formData.description.trim(),
        chefName: formData.chefName,
        chefId: formData.chefId,
        ingredients: formData.ingredients
          .split(",")
          .map(item => item.trim())
          .filter(Boolean),
        estimatedDeliveryTime: { minTime, maxTime },
        price: Number(formData.price),
        rating: Number(formData.rating),
        chefExperience: Number(formData.chefExperience),
        foodImage,
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/meals`,
        mealData
      );

      if (response.data.insertedId) {
        toast.success("Meal added successfully");
        reset();
      }
    } catch {
      toast.error("Could not create the meal right now");
    }
  };

  if (isUserLoading) return <LoadingSpinner />;

  return (
    <div className="rounded-[1.75rem] border border-base-300/70 bg-base-100 p-5 shadow-sm sm:p-6">
      <form onSubmit={handleSubmit(handleMealSubmit)} className="space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1.2fr,0.95fr]">
          <section className="space-y-6 rounded-[1.5rem] bg-base-200/45 p-5">
            <div>
              <h2 className="text-xl font-semibold text-base-content">
                Meal details
              </h2>
              <p className="mt-2 text-sm leading-7 text-base-content/65">
                Add enough detail for customers to understand the dish quickly
                without making the listing feel crowded.
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <label className="font-medium text-base-content/75">
                Food name
              </label>
              <input
                type="text"
                {...register("foodName", {
                  required: { value: true, message: "Food name is required" },
                })}
                placeholder="Enter food name"
                className={inputClassName}
              />
              {errors.foodName && (
                <p className="text-sm text-error">{errors.foodName.message}</p>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <label className="font-medium text-base-content/75">
                Chef name
              </label>
              <input
                type="text"
                defaultValue={userData?.name}
                {...register("chefName", {
                  required: { value: true, message: "Chef name is required" },
                })}
                placeholder="Chef full name"
                className={inputClassName}
              />
              {errors.chefName && (
                <p className="text-sm text-error">{errors.chefName.message}</p>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <label className="font-medium text-base-content/75">
                Ingredients
              </label>
              <textarea
                {...register("ingredients", {
                  required: {
                    value: true,
                    message: "Ingredient names are required",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9\s-]+\s*,\s*[a-zA-Z0-9\s-]+(\s*,\s*[a-zA-Z0-9\s-]+)*\s*$/,
                    message: "Each ingredient should be separated by a comma",
                  },
                })}
                placeholder="List ingredients separated by commas"
                className={`${inputClassName} min-h-36`}
              />
              {errors.ingredients && (
                <p className="text-sm text-error">
                  {errors.ingredients.message}
                </p>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <label className="font-medium text-base-content/75">
                Product description
              </label>
              <textarea
                {...register("description", {
                  required: {
                    value: true,
                    message: "Product description is required",
                  },
                })}
                placeholder="Describe the dish in a clear way so customers know what to expect before ordering"
                className={`${inputClassName} min-h-32`}
              />
              {errors.description && (
                <p className="text-sm text-error">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <label className="font-medium text-base-content/75">
                Estimated delivery time
              </label>
              <input
                type="text"
                {...register("estimatedDeliveryTime", {
                  required: {
                    value: true,
                    message: "Delivery time is required",
                  },
                  pattern: {
                    value: /^\d+\s*-\s*\d+$/,
                    message: "Use this format: 30-45",
                  },
                })}
                placeholder="e.g. 30-45 minutes"
                className={inputClassName}
              />
              {errors.estimatedDeliveryTime && (
                <p className="text-sm text-error">
                  {errors.estimatedDeliveryTime.message}
                </p>
              )}
            </div>
          </section>

          <section className="space-y-6 rounded-[1.5rem] bg-base-200/45 p-5">
            <div>
              <h2 className="text-xl font-semibold text-base-content">
                Pricing and delivery
              </h2>
              <p className="mt-2 text-sm leading-7 text-base-content/65">
                Keep prices realistic, delivery windows honest, and the listing
                ready for real customer orders.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 text-sm">
                <label className="font-medium text-base-content/75">Price</label>
                <input
                  type="number"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Meal price is required",
                    },
                    min: { value: 1, message: "Price can't be lower than 1" },
                  })}
                  placeholder="BDT"
                  className={inputClassName}
                />
                {errors.price && (
                  <p className="text-sm text-error">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <label className="font-medium text-base-content/75">
                  Rating
                </label>
                <input
                  type="number"
                  {...register("rating", {
                    required: {
                      value: true,
                      message: "Meal rating is required",
                    },
                    min: { value: 1, message: "Rating can't be lower than 1" },
                    max: { value: 5, message: "Rating can't exceed 5" },
                  })}
                  step="0.1"
                  placeholder="1 - 5"
                  className={inputClassName}
                />
                {errors.rating && (
                  <p className="text-sm text-error">{errors.rating.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <label className="font-medium text-base-content/75">
                Chef experience (years)
              </label>
              <input
                type="number"
                {...register("chefExperience", {
                  required: {
                    value: true,
                    message: "Chef experience is required",
                  },
                  min: { value: 0, message: "Experience can't be negative" },
                })}
                placeholder="Years of experience"
                className={inputClassName}
              />
              {errors.chefExperience && (
                <p className="text-sm text-error">
                  {errors.chefExperience.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 text-sm">
                <label className="font-medium text-base-content/75">
                  Chef ID
                </label>
                <input
                  type="text"
                  defaultValue={userData?.chefId}
                  {...register("chefId")}
                  readOnly
                  className={readOnlyClassName}
                />
              </div>

              <div className="space-y-2 text-sm">
                <label className="font-medium text-base-content/75">
                  User email
                </label>
                <input
                  type="email"
                  value={userData?.email}
                  readOnly
                  className={readOnlyClassName}
                />
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-dashed border-base-300 bg-base-100 px-5 py-6">
              <div className="space-y-2 text-sm">
                <label className="font-medium text-base-content/75">
                  Food image
                </label>
                <label className="flex cursor-pointer flex-col items-center gap-3 rounded-[1.25rem] bg-base-200/60 px-4 py-6 text-center">
                  <input
                    type="file"
                    {...register("foodImage", {
                      required: {
                        value: true,
                        message: "Food image is required",
                      },
                    })}
                    accept="image/*"
                    hidden
                  />
                  <span className="btn btn-outline rounded-full">
                    Upload food image
                  </span>
                  <span className="max-w-sm text-xs leading-6 text-base-content/60">
                    Use one clear image that makes the meal feel real and easy
                    to trust at first glance.
                  </span>
                </label>
                {errors.foodImage && (
                  <p className="text-sm text-error">{errors.foodImage.message}</p>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full rounded-full">
              Save meal
            </button>
          </section>
        </div>
      </form>
    </div>
  );
};

export default CreateMealForm;
