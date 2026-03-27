import { Link } from "react-router";

const MealCard = ({ meal }) => {
  const {
    _id,
    foodName,
    chefName,
    foodImage,
    price,
    rating,
    estimatedDeliveryTime,
  } = meal;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={foodImage}
        alt={foodName}
        className="w-full h-48 object-cover"
      />

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold">{foodName}</h3>

        <p className="text-sm text-gray-500">Chef: {chefName}</p>

        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-lime-600">৳{price}</span>
          <span>{rating} ⭐</span>
        </div>

        <p className="text-sm text-gray-500">
          Delivery: {estimatedDeliveryTime.minTime}–
          {estimatedDeliveryTime.maxTime} mins
        </p>

        <Link
          to={`/meal/${_id}`}
          className="block text-center mt-4 px-4 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MealCard;
