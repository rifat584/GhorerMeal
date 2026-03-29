import { Link } from "react-router";

const Card = ({ meal }) => {
  const {
    chefName,
    estimatedDeliveryTime,
    foodImage,
    foodName,
    price,
    rating,
    _id,
  } = meal;

  return (
    <article className="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex w-full flex-col gap-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem]">
          <img
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            src={foodImage}
            alt={foodName}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-base-content">{foodName}</h3>
              <p className="text-sm text-base-content/60">Chef {chefName}</p>
            </div>
            <span className="rounded-full bg-base-200 px-3 py-1 text-sm font-semibold text-primary">
              ৳{price}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-base-content/68">
            <span>{estimatedDeliveryTime.minTime} to {estimatedDeliveryTime.maxTime} mins</span>
            <span>{rating} ★ rating</span>
          </div>
        </div>

        <Link to={`/meal/${_id}`} className="btn btn-primary mt-1 w-full rounded-full">
          See Details
        </Link>
      </div>
    </article>
  );
};

export default Card;
