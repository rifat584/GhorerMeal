import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Container from "../Shared/Container";
import LoadingSpinner from "../Shared/LoadingSpinner";
import queryFetch from "../../utilitis/queryFetch";

const buildDeliveryText = (estimatedDeliveryTime) => {
  if (!estimatedDeliveryTime?.minTime || !estimatedDeliveryTime?.maxTime) {
    return "Delivery time listed with the meal";
  }

  return `${estimatedDeliveryTime.minTime} to ${estimatedDeliveryTime.maxTime} mins`;
};

const buildChefSummary = (chef) => {
  const firstName = chef.name.split(" ")[0];
  const mealLabel = chef.totalMeals === 1 ? "meal" : "meals";
  const locationText =
    chef.address && chef.address !== "N/A" ? ` from ${chef.address}` : "";

  return `${chef.name} is one of the local cooks${locationText} building a menu around practical home-style dishes. ${firstName} currently has ${chef.totalMeals} published ${mealLabel} on Ghorer Meal, with meals people can come back to during a normal week.`;
};

const MeetOurChefs = () => {
  const [activeChefIndex, setActiveChefIndex] = useState(0);

  const {
    data: chefs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["home-chefs"],
    queryFn: async () => queryFetch("home-chefs?limit=6"),
  });

  const selectedChef = chefs[activeChefIndex] || chefs[0];

  const {
    data: selectedChefMeals = [],
    isLoading: isMealsLoading,
    isError: isMealsError,
  } = useQuery({
    queryKey: ["home-chef-meals", selectedChef?.chefId],
    enabled: !!selectedChef?.chefId,
    queryFn: async () => {
      const meals = await queryFetch(`my-meal/${selectedChef.chefId}`);
      return meals.slice(0, 3);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <section className="bg-neutral py-18 text-neutral-content">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold md:text-5xl">
              Meet Our Top Chefs
            </h2>
            <p className="mt-5 text-sm leading-7 text-neutral-content/72 md:text-base">
              Chef profiles are not available right now.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const addressLabel =
    selectedChef.address && selectedChef.address !== "N/A"
      ? selectedChef.address
      : "Local chef profile";

  const chefDescription =
    selectedChef.description || buildChefSummary(selectedChef);

  return (
    <section className="bg-neutral py-18 text-neutral-content">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold md:text-5xl">
            Meet Our Top Chefs
          </h2>
          <p className="mt-5 text-sm leading-7 text-neutral-content/72 md:text-base">
            The best local meal platforms make the cooks visible. You should be
            able to see who is behind the food, what they are known for, and
            which dishes feel worth trying first.
          </p>
        </div>

        <div className="mt-10 rounded-4xl border border-white/10 bg-white/5 p-3">
          <div className="flex gap-2 overflow-x-auto pb-1 justify-center">
            {chefs.map((chef, index) => (
              <button
                key={chef._id}
                type="button"
                onClick={() => setActiveChefIndex(index)}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition ${index === activeChefIndex ? "bg-white text-neutral shadow-sm" : "text-neutral-content/72 hover:bg-white/10 hover:text-neutral-content"}`}
                aria-pressed={index === activeChefIndex}
              >
                {chef.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[0.61fr_1.22fr] xl:items-start">
          <article className="rounded-4xl border border-white/10 bg-white/5 p-6 sm:p-8 h-full">
            <div className="flex items-center gap-4">
              <img
                src={selectedChef.profileImage || "/ghorermeal.png"}
                alt={selectedChef.name}
                className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20 hover:scale-102 transition duration-300"
              />
              <div>
                <h3 className="text-3xl font-semibold text-neutral-content">
                  {selectedChef.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-content/62">
                  {addressLabel}
                </p>
              </div>
            </div>

            <p className="mt-8 text-base leading-8 text-neutral-content/78">
              {chefDescription}
            </p>
          </article>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {isMealsLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-108 animate-pulse rounded-4xl bg-white/8"
                />
              ))}

            {!isMealsLoading && isMealsError && (
              <article className="rounded-4xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-neutral-content/72 md:col-span-2 xl:col-span-3">
                Meals for this chef are not available right now.
              </article>
            )}

            {!isMealsLoading &&
              !isMealsError &&
              selectedChefMeals.map((meal) => (
                <Link
                  key={meal._id}
                  to={`/meal/${meal._id}`}
                  className="group relative min-h-120 overflow-hidden rounded-4xl"
                >
                  <img
                    src={meal.foodImage}
                    alt={meal.foodName}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                      {meal?.category}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
                      {meal?.foodName}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/82">
                      <span>৳{meal?.price}</span>
                      <span>
                        {buildDeliveryText(meal?.estimatedDeliveryTime)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MeetOurChefs;
