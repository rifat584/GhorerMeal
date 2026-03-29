import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import ReviewCard from "./ReviewCard";
import queryFetch from "../../utilitis/queryFetch";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";

const ReviewsSection = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => queryFetch("reviews"), // same helper as meals
  });

  if (isLoading) return <LoadingSpinner />;


  if (reviews.length === 0) {
    return (
      <section className="bg-base-100 py-18">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-base-content">Customer Reviews</h2>
            <p className="mt-4 text-base-content/65">No reviews yet.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-base-100 py-18">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Community voices
            </p>
            <h2 className="mt-3 text-3xl font-bold text-base-content md:text-4xl">
              What customers say after the first few orders
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-base-content/70">
            Ratings and reviews help new customers order with more confidence and
            help reliable cooks build stronger repeat business.
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          className="mt-10"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default ReviewsSection;
