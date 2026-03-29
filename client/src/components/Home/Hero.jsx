import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import Container from "../Shared/Container";

const Hero = () => {
  return (
    <section className="overflow-hidden border-b border-base-300 bg-base-100">
      <Container>
        <div className="grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-18">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
        >
            <p className="inline-flex rounded-full border border-base-300 bg-base-200 px-4 py-2 text-sm font-semibold text-primary">
              Everyday comfort food, prepared by trusted local kitchens
            </p>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-base-content md:text-5xl xl:text-6xl">
              Order meals that feel homemade, even on the busiest days
          </h1>

            <p className="max-w-2xl text-base leading-8 text-base-content/72 md:text-lg">
              Ghorer Meal helps families, students, and professionals discover
              dependable home-style dishes from verified cooks around the city,
              with clear delivery windows and weekly favorites that are easy to
              reorder.
          </p>

            <div className="flex flex-wrap gap-4">
            <Link
              to="/all-meals"
                className="btn btn-primary rounded-full px-6"
            >
              Explore Meals
            </Link>

            <Link
                to="/how-it-works"
                className="btn btn-outline rounded-full px-6"
            >
                How It Works
            </Link>
          </div>

            <div className="grid gap-3 pt-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm">
                <p className="text-sm text-base-content/60">Verified kitchens</p>
                <p className="mt-2 text-lg font-semibold">Local cooks you can trust</p>
              </div>
              <div className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm">
                <p className="text-sm text-base-content/60">Delivery rhythm</p>
                <p className="mt-2 text-lg font-semibold">Lunch, dinner, and weekly plans</p>
              </div>
              <div className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm">
                <p className="text-sm text-base-content/60">Community score</p>
                <p className="mt-2 text-lg font-semibold">4.9 average satisfaction</p>
              </div>
            </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="relative"
        >
            <div className="rounded-[2rem] border border-base-300 bg-base-200 p-4 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80"
                alt="Freshly plated home-style meal"
                className="h-[340px] w-full rounded-[1.5rem] object-cover md:h-[440px]"
              />
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-2 left-0 rounded-3xl border border-base-300 bg-base-100 px-5 py-4 shadow-lg md:-left-6 md:bottom-6"
            >
              <p className="text-sm text-base-content/60">This week’s favorite</p>
              <p className="mt-1 text-lg font-semibold">Family dinner boxes from nearby chefs</p>
            </motion.div>
        </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
