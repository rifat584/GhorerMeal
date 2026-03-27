import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <img
          src={review.reviewerImage}
          alt={review.reviewerName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{review.reviewerName}</p>
          <p className="text-sm text-gray-500">
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < review.rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <p className="text-gray-600 text-sm">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
