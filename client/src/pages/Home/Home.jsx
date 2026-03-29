import Hero from "../../components/Home/Hero";
import DailyMeals from "../../components/Home/DailyMeals";
import ReviewsSection from "../../components/Home/ReviewsSection";
import WhyChooseUs from "../../components/Home/WhyChooseUs";

const Home = () => {
  return (
    <main className="pb-16">
      <Hero />
      <DailyMeals />
      <ReviewsSection />
      <WhyChooseUs />
    </main>
  );
};

export default Home;
