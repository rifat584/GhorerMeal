import { Link } from 'react-router'
import FavoriteMealForm from '../../../components/Form/FavoriteMealForm';
import {useQuery} from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth';
import queryFetch from '../../../utilitis/queryFetch';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { DashboardPage, DashboardTable } from '../../../components/Dashboard/DashboardUI';

const FavoriteMeal = () => {
  const {user}= useAuth();
  const {data:favoriteMeals, isLoading}= useQuery({
    queryKey: ['favoriteMeal', user?.email],
    enabled: !!user?.email,
    queryFn: ()=> queryFetch(`favorite-meal/${user?.email}`)
  })
  if(isLoading) return <LoadingSpinner/>

  return (
    <DashboardPage
      title='Favorite meals'
      description='Save dishes that feel worth coming back to, then review them here when you are ready to order again.'
    >
      <DashboardTable
        title='Saved list'
        countLabel='Favorite'
        columns={['Meal', 'Chef', 'Saved on', 'Actions']}
        rowCount={favoriteMeals.length}
        emptyTitle='No saved meals yet'
        emptyDescription='When you favorite meals while browsing, they will show up here for quick access.'
        emptyAction={
          <Link to='/all-meals' className='btn btn-primary rounded-full'>
            Explore meals
          </Link>
        }
      >
        {favoriteMeals.map(favorite => (
          <FavoriteMealForm key={favorite._id} favorite={favorite} />
        ))}
      </DashboardTable>
    </DashboardPage>
  );
};

export default FavoriteMeal;
