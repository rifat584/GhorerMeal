import Card from './Card'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import LoadingSpinner from '../Shared/LoadingSpinner'
import queryFetch from '../../utilitis/queryFetch'

const Meals = () => {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState("createdAt")
  const [order, setOrder] = useState("desc")
  const limit = 6

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['allMeals', page, sortBy, order],
    queryFn: async () =>
      queryFetch(`all-meals?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`),
  })

  if (isLoading) return <LoadingSpinner />

  if (isError) {
    return (
      <Container>
        <div className='mt-8 rounded-[1.75rem] border border-base-300 bg-base-100 p-6 text-center shadow-sm'>
          <h2 className='text-2xl font-semibold text-base-content'>Meals are not available right now</h2>
          <p className='mt-3 text-sm leading-7 text-base-content/70 md:text-base'>
            {error?.message || 'Please try again when the API is available.'}
          </p>
        </div>
      </Container>
    )
  }

  const meals = data?.data || []
  const totalPages = data?.totalPages || 1

  if (meals.length === 0) {
    return (
      <Container>
        <div className='mt-8 rounded-[1.75rem] border border-base-300 bg-base-100 p-6 text-center shadow-sm'>
          <h2 className='text-2xl font-semibold text-base-content'>No meals have been published yet</h2>
          <p className='mt-3 text-sm leading-7 text-base-content/70 md:text-base'>
            Check back after local chefs add a few dishes to the menu.
          </p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className='mt-8 flex flex-col gap-4 rounded-[1.75rem] border border-base-300 bg-base-100 p-5 shadow-sm md:flex-row md:items-center md:justify-between md:p-6'>
        <div>
          <p className='text-sm text-base-content/60'>Sort meals by what matters most</p>
        </div>
        <div className='flex flex-col gap-3 sm:flex-row'>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
            className='select w-full rounded-full border-base-300 bg-base-100 sm:w-52'
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="chefExperience">Chef Experience</option>
          <option value="createdAt">Newest</option>
        </select>

        <select
          value={order}
          onChange={e => setOrder(e.target.value)}
            className='select w-full rounded-full border-base-300 bg-base-100 sm:w-44'
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
          </div>
      </div>

      <div className='grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {meals.map(meal => <Card key={meal._id} meal={meal} />)}
      </div>

      <div className='mt-10 flex flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-base-300 bg-base-100 px-5 py-6 text-center shadow-sm sm:flex-row'>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className='btn btn-outline rounded-full px-6 disabled:opacity-50'
        >
          Prev
        </button>

        <span className='text-sm font-medium text-base-content/70'>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className='btn btn-primary rounded-full px-6 disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </Container>
  )
}

export default Meals
