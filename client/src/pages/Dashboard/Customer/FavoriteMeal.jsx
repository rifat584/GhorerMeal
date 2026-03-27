import React from 'react';
import FavoriteMealForm from '../../../components/Form/FavoriteMealForm';
import {useQuery} from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth';
import queryFetch from '../../../utilitis/queryFetch';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const FavoriteMeal = () => {
  const {user}= useAuth();
  const {data:favoriteMeals, isLoading}= useQuery({
    queryKey: ['favoriteMeal', user?.email],
    enabled: !!user?.email,
    queryFn: ()=> queryFetch(`favorite-meal/${user?.email}`)
  })
  if(isLoading) return <LoadingSpinner/>
  console.log(favoriteMeals);
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Meal Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Chef Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Date Added
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    favoriteMeals.map(favorite=> <FavoriteMealForm key={favorite._id} favorite={favorite} />)
                  }
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoriteMeal;