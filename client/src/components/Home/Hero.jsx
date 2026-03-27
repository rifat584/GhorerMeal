import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
const Hero = () => {
  return (
    <section className="relative bg-linear-to-r from-lime-500 to-green-600 text-white overflow-hidden">
      <div className="container mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
            Homemade Meals <br /> From Trusted Chefs
          </h1>

          <p className="text-lg text-lime-100 max-w-xl">
            Discover delicious, freshly cooked meals prepared by verified local
            chefs and delivered straight to your doorstep.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/all-meals"
              className="px-6 py-3 bg-white text-lime-600 font-semibold rounded-md hover:bg-gray-100 transition"
            >
              Explore Meals
            </Link>

            <Link
              to="/signup"
              className="px-6 py-3 border border-white rounded-md font-semibold hover:bg-white hover:text-lime-600 transition"
            >
              Become a Chef
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            alt="Delicious Food"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />

          {/* Floating Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -bottom-6 -left-6 bg-white text-gray-800 px-5 py-3 rounded-xl shadow-lg"
          >
            ⭐ 4.9 Average Rating
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
