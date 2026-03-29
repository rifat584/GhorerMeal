import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[1.75rem] border border-base-300 bg-base-100 p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={review.reviewerImage}
          alt={review.reviewerName}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{review.reviewerName}</p>
          <p className="text-sm text-base-content/55">
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < review.rating ? "text-secondary" : "text-base-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <p className="text-sm leading-7 text-base-content/70">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
