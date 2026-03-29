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
    <article className="overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={foodImage}
        alt={foodName}
        className="h-56 w-full object-cover"
      />

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-base-content">{foodName}</h3>
            <p className="mt-1 text-sm text-base-content/60">By {chefName}</p>
          </div>
          <span className="rounded-full bg-base-200 px-3 py-1 text-sm font-semibold text-primary">
            ৳{price}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-base-content/68">
          <span>{rating} ★ average rating</span>
          <span>
            {estimatedDeliveryTime.minTime} to {estimatedDeliveryTime.maxTime} mins
          </span>
        </div>

        <Link
          to={`/meal/${_id}`}
          className="btn btn-primary mt-2 w-full rounded-full"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default MealCard;
