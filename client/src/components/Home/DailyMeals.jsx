import { useQuery } from "@tanstack/react-query";
import MealCard from "./MealCard";
import LoadingSpinner from "../Shared/LoadingSpinner";
import queryFetch from "../../utilitis/queryFetch";
import Container from "../Shared/Container";

const DailyMeals = () => {
  const {
    data: meals,
    isLoading,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => queryFetch("meals"),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="bg-base-200/55 py-18">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Today&apos;s picks
            </p>
            <h2 className="mt-3 text-3xl font-bold text-base-content md:text-4xl">
              Popular meals people are ordering right now
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-base-content/70">
            From quick lunches to hearty dinners, these are the dishes helping
            customers discover what Ghorer Meal is best known for.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {meals.slice(0, 6).map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DailyMeals;
