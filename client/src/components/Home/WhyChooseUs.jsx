import React from "react";
import { FaLeaf, FaClock, FaStar } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-[#80BF2A]">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/3 flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-green-900">Why Choose Us</h2>
          <p className="text-gray-700 text-lg">
            Our platform brings you the best meals made by top chefs, using
            fresh ingredients and delivering them right to your doorstep.
            Experience quality, speed, and excellence in every bite.
          </p>

          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3 text-gray-700">
              <FaLeaf className="text-green-500 text-2xl" />
              Fresh Ingredients for every meal
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <FaClock className="text-yellow-500 text-2xl" />
              Fast & Reliable Delivery
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <FaStar className="text-blue-500 text-2xl" />
              Experienced & Top-rated Chefs
            </li>
          </ul>
        </div>

        <div className="lg:flex-1 w-full">
          <img
            className="rounded-xl shadow-lg object-cover w-full h-96 lg:h-[500px]"
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
            alt="Delicious meals"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
