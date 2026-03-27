import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import {toast} from 'react-hot-toast'

const FavoriteMealForm = ({favorite}) => {
  const queryClient= useQueryClient();
  const {mealName, chefName, price, addedTime,_id }= favorite;

  const {mutate} = useMutation(
    {
      mutationFn: (id)=> axios.delete(`${import.meta.env.VITE_API_BASE_URL}/favorite/${id}`),
      onSuccess: data=>{
        if(data.data.deletedCount > 0){
          toast.success("Meal removed from favorites successfully.");
          queryClient.invalidateQueries({queryKey: ['favoriteMeal']})
        }
      },
      onError: error=>toast.error(error.message),
    }
  )

  return (
    <tr>
      
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{mealName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{chefName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{price} TK</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{addedTime.split("T")[0]}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={()=>mutate(_id)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </span>
        
      </td>
    </tr>
  );
};

export default FavoriteMealForm;