import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import Container from '../Shared/Container'
import LoadingSpinner from '../Shared/LoadingSpinner'
import queryFetch from '../../utilitis/queryFetch'

const buildDeliveryText = estimatedDeliveryTime => {
  if (!estimatedDeliveryTime?.minTime || !estimatedDeliveryTime?.maxTime) {
    return 'Delivery time listed with the meal'
  }

  return `${estimatedDeliveryTime.minTime} to ${estimatedDeliveryTime.maxTime} mins`
}

const buildIngredientText = ingredients => {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return 'Chef-picked ingredients and a home-style finish'
  }

  return ingredients.slice(0, 3).join(', ')
}

const InnovativeRecipes = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['innovative-recipes'],
    queryFn: async () =>
      queryFetch('all-meals?page=1&limit=3&sortBy=rating&order=desc'),
  })

  if (isLoading) return <LoadingSpinner />

  if (isError) {
    return (
      <section className='bg-base-200/40 py-20 lg:py-24'>
        <Container>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-3xl font-semibold text-base-content md:text-5xl'>
              Innovative recipes that still feel worth ordering on a weekday
            </h2>
            <p className='mt-4 text-sm leading-7 text-base-content/72 md:text-base'>
              {error?.message || 'Featured recipes are not available right now.'}
            </p>
          </div>
        </Container>
      </section>
    )
  }

  const meals = data?.data || []

  if (meals.length === 0) {
    return (
      <section className='bg-base-200/40 py-20 lg:py-24'>
        <Container>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-3xl font-semibold text-base-content md:text-5xl'>
              Innovative recipes that still feel worth ordering on a weekday
            </h2>
            <p className='mt-4 text-sm leading-7 text-base-content/72 md:text-base'>
              Featured recipes will appear here after meals with ratings are available.
            </p>
          </div>
        </Container>
      </section>
    )
  }

  const [featuredMeal, ...otherMeals] = meals

  return (
    <section className='bg-base-200/40 py-20 lg:py-24'>
      <Container>
        <header className='flex flex-col items-center text-center'>
          <h2 className='max-w-3xl text-3xl font-semibold text-base-content md:text-5xl'>
            Innovative recipes that still feel worth ordering on a weekday
          </h2>
          <p className='max-w-4xl mt-4 text-sm leading-7 text-base-content/72 md:text-base'>
            The strongest food platforms do not only show familiar dishes. They also
            make room for chefs who can present recipes with more personality while
            still fitting real routines.
          </p>
        </header>

        <div className='mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]'>
          <article className='overflow-hidden rounded-4xl border border-base-300 bg-base-100 shadow-sm'>
            <img
              src={featuredMeal.foodImage}
              alt={featuredMeal.foodName}
              className='h-80 w-full object-cover md:h-[460px]'
            />
            <div className='space-y-4 p-6 md:p-8'>
              <div className='flex flex-wrap items-center gap-3 text-sm text-base-content/60'>
                <span>Chef {featuredMeal.chefName}</span>
                <span>{buildDeliveryText(featuredMeal.estimatedDeliveryTime)}</span>
              </div>
              <h3 className='text-2xl font-semibold text-base-content md:text-3xl'>
                {featuredMeal.foodName}
              </h3>
              <p className='text-sm leading-8 text-base-content/70 md:text-base'>
                A featured recipe should do more than look different. It should show how
                a local chef can bring something thoughtful to the menu without losing
                the comfort and practicality people come for in the first place.
              </p>
              <p className='text-sm leading-7 text-base-content/62'>
                Ingredients: {buildIngredientText(featuredMeal.ingredients)}
              </p>
              <div className='flex flex-wrap gap-3'>
                <Link to='/all-meals' className='btn btn-primary rounded-full px-6'>
                  Explore meals
                </Link>
                <Link to={`/meal/${featuredMeal._id}`} className='btn btn-outline rounded-full px-6'>
                  View this meal
                </Link>
              </div>
            </div>
          </article>

          <div className='grid gap-6'>
            {otherMeals.map(meal => (
              <article
                key={meal._id}
                className='grid gap-4 rounded-4xl border border-base-300 bg-base-100 p-4 shadow-sm sm:grid-cols-[0.95fr_1.05fr] sm:items-center sm:p-5'
              >
                <div className='overflow-hidden rounded-3xl'>
                  <img
                    src={meal.foodImage}
                    alt={meal.foodName}
                    className='h-52 w-full object-cover'
                  />
                </div>
                <div>
                  <p className='text-sm text-base-content/58'>{meal.chefName}</p>
                  <h3 className='mt-2 text-xl font-semibold text-base-content'>{meal.foodName}</h3>
                  <p className='mt-3 text-sm leading-7 text-base-content/70'>
                    Good recipe sections work best when they explain why a dish feels
                    memorable and practical, not just what it is called.
                  </p>
                  <p className='mt-3 text-sm text-base-content/60'>
                    {buildDeliveryText(meal.estimatedDeliveryTime)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default InnovativeRecipes
