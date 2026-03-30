import { useQuery } from "@tanstack/react-query";
import MealCard from "./MealCard";
import LoadingSpinner from "../Shared/LoadingSpinner";
import queryFetch from "../../utilitis/queryFetch";
import Container from "../Shared/Container";

const DailyMeals = () => {
  const {
    data: meals = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => queryFetch("meals"),
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <section className="bg-base-200/40 py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-base-content md:text-5xl">
              Popular meals people are ordering right now
            </h2>
            <p className="mt-4 text-sm leading-7 text-base-content/70 md:text-base">
              {error?.message || "Meals are not available right now."}
            </p>
          </div>
        </Container>
      </section>
    );
  }

  if (meals.length === 0) {
    return (
      <section className="bg-base-200/40 py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-base-content md:text-5xl">
              Popular meals people are ordering right now
            </h2>
            <p className="mt-4 text-sm leading-7 text-base-content/70 md:text-base">
              Meals will appear here after chefs publish their menus.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-base-200/40 py-20 lg:py-24">
      <Container>
        <div className="flex flex-col items-center gap-3 lg:gap-4 text-center">
          <h2 className="text-3xl font-bold text-base-content md:text-5xl">
            Popular meals people are ordering right now
          </h2>
          <p className="max-w-xl text-base leading-7 text-base-content/70">
            From quick lunches to hearty dinners, these are the dishes helping
            customers discover what Ghorer Meal is best known for.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {meals.slice(0, 6).map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DailyMeals;
