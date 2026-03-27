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

  const { data, isLoading } = useQuery({
    queryKey: ['allMeals', page, sortBy, order],
    queryFn: async () =>
      queryFetch(`all-meals?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`),
  })

  if (isLoading) return <LoadingSpinner />

  const { data: meals, totalPages } = data

  return (
    <Container>
      {/* Sort Section */}
      <div className="flex justify-end items-center mb-4 gap-2">
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="chefExperience">Chef Experience</option>
          <option value="createdAt">Newest</option>
        </select>

        <select
          value={order}
          onChange={e => setOrder(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Meal Cards */}
      <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {meals.map(meal => <Card key={meal._id} meal={meal} />)}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Container>
  )
}

export default Meals
