
import { Link } from "react-router";
import Hero from "../../components/Home/Hero";
import DailyMeals from "../../components/Home/DailyMeals";
import ReviewsSection from "../../components/Home/ReviewsSection";
import WhyChooseUs from "../../components/Home/WhyChooseUs";


const Home = () => {
  return (
<div>
  <Hero/>
  <DailyMeals/>
  <ReviewsSection/>
  <WhyChooseUs/>
</div>
  );
};

export default Home;
