import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const ReviewModal = ({ isOpenReview, closeModalReview, id ,foodName, refetch}) => {
  const {
    register,
    handleSubmit,
    reset: resetReviewField,
    formState: { errors },
  } = useForm();
const {user}= useAuth();

  const onReviewSubmit = async (data) => {
    console.log(data);
    const mealReviewData = {
    reviewerName: user?.displayName,
    reviewerImage: user?.photoURL,
    reviewerEmail: user?.email,
    rating: data?.rating,
    comment: data?.comment,
    foodName
  };
    try {
      const addToFavList = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/review/${id}`,
        mealReviewData
      );
      if (addToFavList.data.insertedId) {
        toast.success("Your review has been added");
        refetch()
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
closeModalReview();
      resetReviewField()
    }
  };
  return (
    <Dialog
      open={isOpenReview}
      onClose={closeModalReview}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-xl">
          <DialogTitle className="text-lg font-semibold text-center mb-4">
            Add Your Review
          </DialogTitle>

          <form onSubmit={handleSubmit(onReviewSubmit)} className="space-y-3">
            {/* Comment */}
            <textarea
              {...register("comment", {
                required: { value: true, message: "write your review" },
              })}
              placeholder="Write your review"
              className="textarea textarea-bordered w-full"
            />
            {errors.comment && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.comment.message}
              </p>
            )}

            {/* Rating */}
            <select
              {...register("rating", {
                required: { value: true, message: "select your rating" },
              })}
              className="select select-bordered w-full"
            >
              <option value={5}>★★★★★ (5)</option>
              <option value={4}>★★★★☆ (4)</option>
              <option value={3}>★★★☆☆ (3)</option>
              <option value={2}>★★☆☆☆ (2)</option>
              <option value={1}>★☆☆☆☆ (1)</option>
              {errors.rating && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.rating.message}
                </p>
              )}
            </select>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button type="submit" className="btn btn-success flex-1">
                Submit
              </button>
              <button
                type="button"
                onClick={closeModalReview}
                className="btn btn-error btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
