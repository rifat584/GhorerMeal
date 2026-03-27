import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import uploadImage from "../../utilitis/uploadImage";
import { toast, Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import queryFetch from "../../utilitis/queryFetch";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useRole from "../../hooks/useRole";


const CreateMealForm = () => {
  const { user } = useAuth();
  // tanstack query
  const { data:userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => queryFetch(`user/${user?.email}`),
  });

  console.log(userData);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm();

  const handleMealSubmit = async (data) => {
    const {
      foodName,
      chefName,
      ingredients,
      estimatedDeliveryTime,
      price,
      rating,
      chefExperience,
      foodImage,
      chefId,
    } = data;

    const deliverytime = estimatedDeliveryTime.split("-");
    const minTime = Number(deliverytime[0]);
    const maxTime = Number(deliverytime[1].trim());

    try {
      const photoUpload = await uploadImage(foodImage);
      const foodData = {
        foodName,
        chefName,
        chefId,
        ingredients: ingredients.split(","),
        estimatedDeliveryTime: { minTime, maxTime },
        price: Number(price),
        rating: Number(rating),
        chefExperience: Number(chefExperience),
        foodImage: photoUpload,
        createdAt: new Date().toISOString(),
      };
      console.log(foodData);
      const mealSubmit = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/meals`,
        foodData
      );
      const res = await mealSubmit.data.insertedId;
      if (res) {
        toast.success("Meal Added Successfully");
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isUserLoading) return <LoadingSpinner />;
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center bg-gray-50 text-gray-800 rounded-xl">
      <form
        onSubmit={handleSubmit(handleMealSubmit)}
        className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-md"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Meal Name */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Food Name</label>
              <input
                type="text"
                {...register("foodName", {
                  required: { value: true, message: "Food Name is required" },
                })}
                placeholder="Enter food name"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
              />
              {errors.foodName && (
                <p className="mt-1 text-red-500"> {errors.foodName.message}</p>
              )}
            </div>

            {/* Chef Name */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Chef Name</label>
              <input
                type="text"
                {...register("chefName", {
                  required: { value: true, message: "Chef Name is required" }, value:userData?.name
                })}
                placeholder="Chef full name"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
              />
              {errors.chefName && (
                <p className="mt-1 text-red-500"> {errors.chefName.message}</p>
              )}
            </div>

            {/* Ingredients */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Ingredients</label>
              <textarea
                {...register("ingredients", {
                  required: {
                    value: true,
                    message: "ingredient Names are required",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9\s-]+\s*,\s*[a-zA-Z0-9\s-]+(\s*,\s*[a-zA-Z0-9\s-]+)*\s*$/,
                    message: "Each ingredient should be separated by a comma",
                  },
                })}
                placeholder="List ingredients separated by commas"
                className="w-full h-32 px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
              />
              {errors.ingredients && (
                <p className="mt-1 text-red-500">
                  {" "}
                  {errors.ingredients.message}
                </p>
              )}
            </div>

            {/* Estimated Delivery Time */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">
                Estimated Delivery Time
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
                    message: "Estimate time should be in this format (30-45)",
                  },
                })}
                placeholder="e.g. 30-45 minutes"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
              />
              {errors.estimatedDeliveryTime && (
                <p className="mt-1 text-red-500">
                  {" "}
                  {errors.estimatedDeliveryTime.message}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Price & Rating */}
            <div className="flex gap-4">
              <div className="w-1/2 space-y-1 text-sm">
                <label className="block text-gray-600">Price</label>
                <input
                  type="number"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Meal Price is required",
                    },
                    min: { value: 1, message: "Price can't be lower than 1" },
                  })}
                  placeholder="BDT"
                  className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
                />
                {errors.price && (
                  <p className="mt-1 text-red-500"> {errors.price.message}</p>
                )}
              </div>

              <div className="w-1/2 space-y-1 text-sm">
                <label className="block text-gray-600">Rating</label>
                <input
                  type="number"
                  {...register("rating", {
                    required: {
                      value: true,
                      message: "Meal Rating is required",
                    },
                    min: { value: 1, message: "Rating can't be lower than 1" },
                    max: { value: 5, message: "Rating can't exceed 5" },
                  })}
                  step="0.1"
                  placeholder="1 - 5"
                  className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
                />
                {errors.rating && (
                  <p className="mt-1 text-red-500"> {errors.rating.message}</p>
                )}
              </div>
            </div>

            {/* Chef Experience */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">
                Chef's Experience (Years)
              </label>
              <input
                type="number"
                {...register("chefExperience", {
                  required: {
                    value: true,
                    message: "Chef Experience is required",
                  },
                  min: { value: 0, message: "Experience can't be negative" },
                })}
                placeholder="Years of experience"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
              />
              {errors.chefExperience && (
                <p className="mt-1 text-red-500">
                  {" "}
                  {errors.chefExperience.message}
                </p>
              )}
            </div>

            {/* Chef ID (Read Only) */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Chef ID</label>
              <input
                type="text"
                {...register("chefId", {value: userData?.chefId})}
                
                readOnly
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>

            {/* User Email (Read Only) */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">User Email</label>
              <input
                type="email"
                name="email"
                value={userData?.email}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>

            {/* Food Image Upload */}
            <div className="p-4 border-4 border-dotted border-gray-300 rounded-lg">
              <label className="flex flex-col items-center cursor-pointer">
                <input
                  type="file"
                  {...register("foodImage", {
                    required: {
                      value: true,
                      message: "Food Image is required",
                    },
                  })}
                  accept="image/*"
                  hidden
                />
                <span className="bg-lime-500 text-white px-4 py-2 rounded font-semibold">
                  Upload Food Image
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full p-3 text-white font-medium rounded-md bg-lime-500 hover:bg-lime-600 transition"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMealForm;
