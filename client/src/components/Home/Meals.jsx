import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import Card from './Card'
import Container from '../Shared/Container'
import LoadingSpinner from '../Shared/LoadingSpinner'
import queryFetch from '../../utilitis/queryFetch'

const defaultFilters = {
  sortBy: 'createdAt',
  order: 'desc',
}

const Meals = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const search = searchParams.get('search') || ''
  const sortBy = searchParams.get('sortBy') || defaultFilters.sortBy
  const order = searchParams.get('order') || defaultFilters.order
  const maxPrice = searchParams.get('maxPrice') || ''
  const minRating = searchParams.get('minRating') || ''
  const maxDeliveryTime = searchParams.get('maxDeliveryTime') || ''
  const limit = 16

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['allMeals'],
    queryFn: () => queryFetch('meals'),
  })

  const allMeals = data || []
  const normalizedSearch = search.trim().toLowerCase()
  const filteredMeals = allMeals
    .filter(meal => {
      if (
        normalizedSearch &&
        !meal.foodName?.toLowerCase().includes(normalizedSearch) &&
        !meal.chefName?.toLowerCase().includes(normalizedSearch)
      ) {
        return false
      }

      if (maxPrice && Number(meal.price) > Number(maxPrice)) {
        return false
      }

      if (minRating && Number(meal.rating) < Number(minRating)) {
        return false
      }

      if (
        maxDeliveryTime &&
        Number(meal.estimatedDeliveryTime?.maxTime) > Number(maxDeliveryTime)
      ) {
        return false
      }

      return true
    })
    .sort((firstMeal, secondMeal) => {
      if (sortBy === 'createdAt') {
        const firstDate = new Date(firstMeal.createdAt || 0)
        const secondDate = new Date(secondMeal.createdAt || 0)

        return order === 'asc' ? firstDate - secondDate : secondDate - firstDate
      }

      const firstValue = Number(firstMeal[sortBy] || 0)
      const secondValue = Number(secondMeal[sortBy] || 0)

      return order === 'asc'
        ? firstValue - secondValue
        : secondValue - firstValue
    })

  const total = filteredMeals.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * limit
  const meals = filteredMeals.slice(startIndex, startIndex + limit)
  const hasFilters =
    !!search ||
    !!maxPrice ||
    !!minRating ||
    !!maxDeliveryTime ||
    sortBy !== defaultFilters.sortBy ||
    order !== defaultFilters.order

  useEffect(() => {
    if (page === currentPage) return

    const nextSearchParams = new URLSearchParams(searchParams)

    if (totalPages === 1) {
      nextSearchParams.delete('page')
    } else {
      nextSearchParams.set('page', String(currentPage))
    }

    setSearchParams(nextSearchParams)
  }, [currentPage, page, searchParams, setSearchParams, totalPages])

  const updateSearchParams = ({ key, value, keepPage = false }) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (!value || value === defaultFilters[key]) {
      nextSearchParams.delete(key)
    } else {
      nextSearchParams.set(key, value)
    }

    if (!keepPage) {
      nextSearchParams.delete('page')
    }

    setSearchParams(nextSearchParams)
  }

  const clearFilters = () => {
    setSearchParams(new URLSearchParams())
  }

  if (isLoading) return <LoadingSpinner />

  if (isError) {
    return (
      <Container>
        <div className='mt-8 rounded-[1.75rem] border border-base-300 bg-base-200/55 p-6 text-center'>
          <h2 className='text-2xl font-semibold text-base-content'>
            Meals are not available right now
          </h2>
          <p className='mt-3 text-sm leading-7 text-base-content/70 md:text-base'>
            {error?.message || 'Please try again when the API is available.'}
          </p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <section className='mt-8 rounded-[1.75rem] border border-base-300 bg-base-200/55 p-5 md:p-6'>
        <div className='flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <h1 className='text-3xl font-semibold tracking-tight text-base-content md:text-4xl'>
              All Meals
            </h1>
          </div>
          <p className='text-sm font-medium text-base-content/60'>
            {total} {total === 1 ? 'meal' : 'meals'} found
          </p>
        </div>

        <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8'>
          <label className='space-y-2 xl:col-span-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45'>
              Search
            </span>
            <input
              type='text'
              value={search}
              onChange={event =>
                updateSearchParams({
                  key: 'search',
                  value: event.target.value,
                })
              }
              placeholder='Search meals or chefs'
              className='w-full rounded-full border border-base-300 bg-base-100 px-4 py-3 text-sm text-base-content outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10'
            />
          </label>

          <label className='space-y-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45'>
              Price
            </span>
            <select
              value={maxPrice}
              onChange={event =>
                updateSearchParams({ key: 'maxPrice', value: event.target.value })
              }
              className='select w-full rounded-full border-base-300 bg-base-100'
            >
              <option value=''>Any budget</option>
              <option value='300'>Up to 300 TK</option>
              <option value='500'>Up to 500 TK</option>
              <option value='800'>Up to 800 TK</option>
              <option value='1200'>Up to 1200 TK</option>
            </select>
          </label>

          <label className='space-y-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45'>
              Rating
            </span>
            <select
              value={minRating}
              onChange={event =>
                updateSearchParams({ key: 'minRating', value: event.target.value })
              }
              className='select w-full rounded-full border-base-300 bg-base-100'
            >
              <option value=''>Any rating</option>
              <option value='3'>3 stars and up</option>
              <option value='4'>4 stars and up</option>
              <option value='4.5'>4.5 stars and up</option>
            </select>
          </label>

          <label className='space-y-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45'>
              Delivery
            </span>
            <select
              value={maxDeliveryTime}
              onChange={event =>
                updateSearchParams({
                  key: 'maxDeliveryTime',
                  value: event.target.value,
                })
              }
              className='select w-full rounded-full border-base-300 bg-base-100'
            >
              <option value=''>Any time</option>
              <option value='30'>30 mins or less</option>
              <option value='45'>45 mins or less</option>
              <option value='60'>60 mins or less</option>
              <option value='90'>90 mins or less</option>
            </select>
          </label>

          <label className='space-y-2 xl:col-span-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45'>
              Sort
            </span>
            <div className='flex gap-3'>
              <select
                value={sortBy}
                onChange={event =>
                  updateSearchParams({ key: 'sortBy', value: event.target.value })
                }
                className='select w-full rounded-full border-base-300 bg-base-100'
              >
                <option value='createdAt'>Newest</option>
                <option value='price'>Price</option>
                <option value='rating'>Rating</option>
                <option value='chefExperience'>Chef experience</option>
              </select>

              <select
                value={order}
                onChange={event =>
                  updateSearchParams({ key: 'order', value: event.target.value })
                }
                className='select w-full rounded-full border-base-300 bg-base-100'
              >
                <option value='desc'>High to low</option>
                <option value='asc'>Low to high</option>
              </select>
            </div>
          </label>

          <div className='flex  justify-end'>
            <button
              type='button'
              onClick={clearFilters}
              disabled={!hasFilters}
              className='btn btn-ghost min-w-full rounded-full border border-base-300 bg-base-100 disabled:border-base-300 disabled:bg-base-100 disabled:text-base-content/40 xl:w-auto xl:px-6 mt-5'
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      {meals.length > 0 ? (
        <>
          <div className='grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {meals.map(meal => (
              <Card key={meal._id} meal={meal} />
            ))}
          </div>

          <div className='mt-10 flex flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-base-300 bg-base-200/55 px-5 py-6 text-center sm:flex-row'>
            <button
              onClick={() =>
                updateSearchParams({
                  key: 'page',
                  value: String(Math.max(currentPage - 1, 1)),
                  keepPage: true,
                })
              }
              disabled={currentPage === 1}
              className='btn btn-outline rounded-full px-6 disabled:opacity-50'
            >
              Prev
            </button>

            <span className='text-sm font-medium text-base-content/70'>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                updateSearchParams({
                  key: 'page',
                  value: String(Math.min(currentPage + 1, totalPages)),
                  keepPage: true,
                })
              }
              disabled={currentPage === totalPages}
              className='btn btn-primary rounded-full px-6 disabled:opacity-50'
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className='mt-8 rounded-[1.75rem] border border-base-300 bg-base-200/55 p-6 text-center'>
          <h2 className='text-2xl font-semibold text-base-content'>
            No meals match these filters
          </h2>
          <p className='mt-3 text-sm leading-7 text-base-content/70 md:text-base'>
            Try a different search term or clear the filters to see more meals.
          </p>
          <button type='button' onClick={clearFilters} className='btn btn-primary mt-6 rounded-full px-6'>
            Show all meals
          </button>
        </div>
      )}
    </Container>
  )
}

export default Meals
