import Hero from '../../components/Home/Hero'
import DailyMeals from '../../components/Home/DailyMeals'
import MeetOurChefs from '../../components/Home/MeetOurChefs'
import InnovativeRecipes from '../../components/Home/InnovativeRecipes'
import ReviewsSection from '../../components/Home/ReviewsSection'
import BecomeChef from '../../components/Home/BecomeChef'
import FirstOrderQuestions from '../../components/Home/FirstOrderQuestions'

const Home = () => {
  return (
    <main className='pb-16'>
      <Hero />
      <DailyMeals />
      <MeetOurChefs />
      <InnovativeRecipes />
      <ReviewsSection />
      <BecomeChef />
      <FirstOrderQuestions />
    </main>
  )
}

export default Home
