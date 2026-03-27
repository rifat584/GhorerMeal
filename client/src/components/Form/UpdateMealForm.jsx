import { useForm } from "react-hook-form";
import uploadImage from "../../utilitis/uploadImage";
import axios from "axios";

const UpdateMealForm = ({ meal }) => {
  const { register, handleSubmit } = useForm({
  defaultValues: {
    foodName: meal.foodName,
    ingredients: meal.ingredients.join(','),
    price: meal.price,
    minTime: meal.estimatedDeliveryTime.minTime,
    maxTime: meal.estimatedDeliveryTime.maxTime,
    foodImage: meal.foodImage,
  }
});



  const submitUpdateMeal = async (data) => {
    console.log(data);
    try {
      const res= await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/meal/${meal?._id}`)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = async () => {
    const photo = await uploadImage();
  };
  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(submitUpdateMeal)} className="w-full">
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label className="text-gray-600">Food Name</label>
              <input
                {...register("foodName", { required: true })}
                className="w-full px-4 py-3 border border-lime-300 rounded-md"
              />
            </div>

            <div className="space-y-1 text-sm">
              <label className="text-gray-600">
                Ingredients (comma separated)
              </label>
              <textarea
                {...register("ingredients")}
                className="w-full h-24 px-4 py-3 border border-lime-300 rounded-md"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label className="text-gray-600">Price</label>
              <input
                type="number"
                {...register("price", { required: true, valueAsNumber: true })}
                className="w-full px-4 py-3 border border-lime-300 rounded-md"
              />
            </div>

            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Min Time"
                {...register("minTime", { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-lime-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Max Time"
                {...register("maxTime", { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-lime-300 rounded-md"
              />
            </div>

            <div className="border-2 border-dashed p-4 rounded-lg">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  {...register("image")}
                />
                <div className="bg-lime-500 text-white px-4 py-2 rounded">
                  Replace Image (Optional)
                </div>
              </label>

              <p className="text-xs mt-2 text-gray-500">
                Current image will be kept if no new image is uploaded
              </p>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-lime-500 text-white rounded shadow"
            >
              Update Meal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMealForm;
