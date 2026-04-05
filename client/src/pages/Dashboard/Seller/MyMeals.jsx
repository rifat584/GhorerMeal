import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import queryFetch from '../../../utilitis/queryFetch'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import MealDataRow from '../../../components/Dashboard/TableRows/MealDataRow'
import {
  DashboardActionLink,
  DashboardPage,
  DashboardTable,
} from '../../../components/Dashboard/DashboardUI'

const MyMeals = () => {
  const { user } = useAuth()

  const { data: myMeals = [], isLoading } = useQuery({
    queryKey: ['myMeals', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { chefId } = await queryFetch(`user/${user?.email}`)
      const meals = await  queryFetch(`my-meal/${chefId}`)
      return meals
    },
  })

  if(isLoading) return <LoadingSpinner/>

  const totalMeals = myMeals.length
  const averagePrice = totalMeals
    ? Math.round(
        myMeals.reduce((sum, meal) => sum + Number(meal.price || 0), 0) /
          totalMeals
      )
    : 0
  const averageRating = totalMeals
    ? (
        myMeals.reduce((sum, meal) => sum + Number(meal.rating || 0), 0) /
        totalMeals
      ).toFixed(1)
    : '0.0'
  const averageDelivery = totalMeals
    ? Math.round(
        myMeals.reduce(
          (sum, meal) =>
            sum +
            (Number(meal?.estimatedDeliveryTime?.minTime || 0) +
              Number(meal?.estimatedDeliveryTime?.maxTime || 0)) /
              2,
          0
        ) / totalMeals
      )
    : 0

  return (
    <DashboardPage
      title='My meals'
      description='Review the dishes currently tied to your chef profile, update key details, and remove anything you no longer want visible to customers.'
      action={<DashboardActionLink to='/dashboard/create-meal'>Add a new meal</DashboardActionLink>}
      metrics={[
        { label: 'Total meals', value: totalMeals, helper: 'Meals currently listed under your chef account.', tone: 'primary' },
        { label: 'Average price', value: `${averagePrice} TK`, helper: 'Average price across your current dishes.', tone: 'success' },
        { label: 'Average rating', value: averageRating, helper: 'Current average rating across your listed meals.', tone: 'warning' },
        { label: 'Average delivery', value: `${averageDelivery} min`, helper: 'Typical delivery estimate based on your saved ranges.', tone: 'neutral' },
      ]}
    >
      <DashboardTable
        title='Published meals'
        countLabel='Meal'
        columns={['Meal', 'Price', 'Rating', 'Ingredients', 'Delivery', 'Chef', 'Actions']}
        rowCount={myMeals.length}
        emptyTitle='No meals added yet'
        emptyDescription='Add your first meal to start showing dishes in the marketplace and in your chef dashboard.'
        emptyAction={
          <Link to='/dashboard/create-meal' className='btn btn-primary rounded-full'>
            Create your first meal
          </Link>
        }
      >
        {myMeals.map(meal => (
          <MealDataRow meal={meal} key={meal._id} user={user} />
        ))}
      </DashboardTable>
    </DashboardPage>
  )
}

export default MyMeals
