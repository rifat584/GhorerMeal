import React from "react";
import { FaClock, FaLeaf, FaStar } from "react-icons/fa";
import Container from "../Shared/Container";

const WhyChooseUs = () => {
  return (
    <section className="py-18">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-base-300 bg-base-100 p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Why families stay
            </p>
            <h2 className="mt-4 text-3xl font-bold text-base-content md:text-4xl">
              More than food delivery. It feels closer to a neighborhood kitchen.
            </h2>
            <p className="mt-4 text-base leading-8 text-base-content/72">
              The platform is built around trust, consistency, and comfort. You
              know who made the meal, what kind of cooking they are known for,
              and when the order will arrive.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-sm">
              <FaLeaf className="text-3xl text-accent" />
              <h3 className="mt-5 text-xl font-semibold">Fresh ingredients</h3>
              <p className="mt-3 text-sm leading-7 text-base-content/68">
                Meals focus on balanced portions, familiar spices, and kitchen-made
                freshness instead of mass-produced menus.
              </p>
            </article>

            <article className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-sm">
              <FaClock className="text-3xl text-secondary" />
              <h3 className="mt-5 text-xl font-semibold">Clear delivery windows</h3>
              <p className="mt-3 text-sm leading-7 text-base-content/68">
                Customers can quickly understand how long a meal will take and
                choose dishes that fit lunch breaks or family dinners.
              </p>
            </article>

            <article className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-sm">
              <FaStar className="text-3xl text-primary" />
              <h3 className="mt-5 text-xl font-semibold">Real local trust</h3>
              <p className="mt-3 text-sm leading-7 text-base-content/68">
                Ratings, repeat orders, and chef profiles help every kitchen earn
                confidence through good food and dependable service.
              </p>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
