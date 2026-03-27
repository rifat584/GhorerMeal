import { useQuery } from "@tanstack/react-query";
import MealCard from "./MealCard";
import LoadingSpinner from "../Shared/LoadingSpinner";
import queryFetch from "../../utilitis/queryFetch";

const DailyMeals = () => {
  const {
    data: meals,
    isLoading,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => queryFetch("meals"),
  });

  if (isLoading) return <LoadingSpinner />;
  console.log(meals);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Daily Meals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.slice(0, 6).map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyMeals;
