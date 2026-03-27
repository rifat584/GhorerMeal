import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import queryFetch from "../../utilitis/queryFetch";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast, { ToastBar } from "react-hot-toast";
import ReviewModal from "../../components/Modal/ReviewModal";

const MealDetails = () => {
  // purchase modal
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  // review modal
  let [isOpenReview, setIsOpenReview] = useState(false);
  const closeModalReview = () => {
    setIsOpenReview(false);
  };

  const { id } = useParams();
  const { user } = useAuth();

  // LOAD MEAL
  const { data: mealData, isLoading: isMealLoading } = useQuery({
    queryKey: ["meal", id],
    enabled: !!id,
    queryFn: () => queryFetch(`meal/${id}`),
  });

  // LOAD USER
  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: () => queryFetch(`user/${user.email}`),
  });

  // LOAD REVIEWS
  const {
    data: reviews,
    isLoading: isReviewLoading,
    refetch,
  } = useQuery({
    queryKey: ["review", mealData?._id],
    enabled: !!mealData?._id,
    queryFn: () => queryFetch(`reviews/${mealData?._id}`),
  });

  if (isMealLoading) return <LoadingSpinner />;
  if (userDataLoading) return <LoadingSpinner />;
  if (isReviewLoading) return <LoadingSpinner />;

  // meal data
  const {
    foodName,
    chefName,
    chefId,
    ingredients,
    chefExperience,
    estimatedDeliveryTime,
    foodImage,
    price,
    rating,
    _id,
  } = mealData;

  // add to favorite data
  const favoriteFood = {
    userEmail: userData?.email,
    mealName: foodName,
    chefId: chefId,
    chefName: chefName,
    price: price,
  };
  const handleAddToFavorite = async () => {
    try {
      const addToFavList = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/favorite/${_id}`,
        favoriteFood
      );
      if (addToFavList.data.insertedId) {
        toast.success("Successfully added to your Favorite");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <div className="max-w-5xl mx-auto">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure className="lg:w-1/2">
            <img
              src={foodImage}
              alt={foodName}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body">
            <div className="flex justify-between items-start">
              <Heading title={foodName}></Heading>
              <button
                className="btn btn-circle btn-outline hover:btn-primary btn-sm p-0 leading-none flex items-center justify-center"
                onClick={handleAddToFavorite}
              >
                <FaRegStar className="text-xl" />
              </button>
            </div>

            <div className="flex items-center gap-4 my-2">
              <div className="text-2xl font-bold px-4 py-3 flex">
                {/* <FaBangladeshiTakaSign /> */}
                {price} TK
              </div>
              <div className="flex items-center gap-1">
                <div className="text-warning">
                  <FaStar className="text-xl p-0 m-0" />
                </div>
                <span className="font-semibold text-xl">{rating}</span>
              </div>
            </div>

            <div className="divider my-1"></div>

            <div className="space-y-3">
              <div>
                <h3 className="font-bold mb-2">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((item, i) => (
                    <div
                      key={i}
                      className="badge badge-lg bg-base-200 shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="stats shadow w-full">
                <div className="stat p-3">
                  <div className="stat-title text-xs">Delivery Time</div>
                  <div className="stat-value text-lg">
                    {estimatedDeliveryTime.minTime}-
                    {estimatedDeliveryTime.maxTime} min
                  </div>
                </div>
                <div className="stat p-3">
                  <div className="stat-title text-xs">Area</div>
                  {/* this is user's address */}
                  <div className="stat-value text-lg">{userData?.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                <div>
                  <p className="font-bold">{chefName}</p>
                  <p className="text-xs opacity-70">
                    Experience: {chefExperience} years
                  </p>
                  <p className="text-xs opacity-70">ID: {chefId} years</p>
                </div>
              </div>
            </div>

            <div className="card-actions justify-end mt-4">
              <Button
                label={"Order Now"}
                onClick={() => setIsOpen(true)}
              ></Button>
            </div>
          </div>
        </div>
        {/* customer reviews */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

          <div className="flex gap">
            {reviews.map((review) => (
              <div key={review._id} className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src={review.reviewerImage} alt="Ariana Sultana" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">
                            {review.reviewerName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="rating rating-sm">
                              {[...Array(Number(review.rating))].map((_, i) => (
                                <input
                                  key={i}
                                  type="radio"
                                  className="mask mask-star-2 bg-warning"
                                  checked={i < Number(review.rating)}
                                  readOnly
                                />
                              ))}
                            </div>
                            <span className="text-sm font-semibold">
                              {review.rating}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm opacity-60">
                          {review.date.split("T")[0]}
                        </span>
                      </div>
                      <p className="mt-3 text-base">{review.comment}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsOpenReview(true)}
              className="btn btn-primary"
            >
              Write a Review
            </button>
          </div>
        </div>
      </div>
      <ReviewModal
        isOpenReview={isOpenReview}
        closeModalReview={closeModalReview}
        id={_id}
        foodName={foodName}
        refetch={refetch}
      />
      <PurchaseModal
        isOpen={isOpen}
        closeModal={closeModal}
        mealData={mealData}
      />
    </Container>
  );
};

export default MealDetails;
