import { Link } from "react-router";

const Card = ({ meal }) => {
  const {
    chefExperience,
    chefName,
    createdAt,
    estimatedDeliveryTime,
    foodImage,
    foodName,
    price,
    rating,
    _id,
  } = meal;
  return (
    <div className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl">
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            "
        >
          <img
            className="
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              "
            src={foodImage}
            alt="Plant Image"
          />
          <div
            className="
              absolute
              top-3
              right-3
            "
          ></div>
        </div>
        <div className="font-semibold text-lg">Food:{foodName}</div>
        <div className="font-semibold text-lg">Chef Name: {chefName}</div>
        <div className="font-semibold text-lg">Delivery time: {estimatedDeliveryTime.minTime} - {estimatedDeliveryTime.maxTime} min</div>
        <div className="font-semibold text-lg">Rating: {rating}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold"> Price: {price}</div>
        </div>
        <Link to={`/meal/${_id}`} className="btn btn-primary">See Details</Link>
      </div>
    </div>
  );
};

export default Card;
