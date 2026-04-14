import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate, useParams } from 'react-router'
import { BsChatDotsFill } from 'react-icons/bs'
import { FaRegStar, FaStar } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import Container from '../../components/Shared/Container'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import ReviewModal from '../../components/Modal/ReviewModal'
import ReviewCard from '../../components/Home/ReviewCard'
import useAuth from '../../hooks/useAuth'
import useRole from '../../hooks/useRole'
import queryFetch from '../../utilitis/queryFetch'
import ChatModal from '../../components/Modal/ChatModal'

const reviewsPerPage = 6

const getMealDescription = ({
  foodName,
  description,
  chefName,
  ingredients,
  chefExperience,
  estimatedDeliveryTime,
  price,
}) => {
  if (description?.trim()) {
    return description.trim()
  }

  const ingredientsText = ingredients.slice(0, 6).join(', ')
  const deliveryText = estimatedDeliveryTime
    ? `${estimatedDeliveryTime.minTime} to ${estimatedDeliveryTime.maxTime} minutes`
    : 'the usual delivery window shared by the chef'

  return `${foodName} brings together ${ingredientsText} in a dish that feels practical for repeat ordering, not just a one-time try. ${chefName} has ${chefExperience} years of cooking experience behind it, and at ${price} TK with a delivery window of ${deliveryText}, the meal is easier to trust when someone wants clear expectations around flavor, timing, and value.`
}

const formatReviewCount = reviewCount => {
  return `${reviewCount} review${reviewCount === 1 ? '' : 's'}`
}

const MealDetails = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [reviewPage, setReviewPage] = useState(1)
  const { id } = useParams()
  const { user } = useAuth()
  const { role, isRoleLoading } = useRole()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    data: mealData,
    isLoading: isMealLoading,
    isError: isMealError,
    error: mealError,
  } = useQuery({
    queryKey: ['meal', id],
    enabled: !!id,
    queryFn: () => queryFetch(`meal/${id}`),
  })

  const {
    data: reviews = [],
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    error: reviewsError,
    refetch,
  } = useQuery({
    queryKey: ['mealReviews', mealData?._id],
    enabled: !!mealData?._id,
    queryFn: () => queryFetch(`reviews/${mealData._id}`),
  })

  if (isMealLoading) {
    return <LoadingSpinner />
  }

  if (isMealError) {
    return (
      <Container>
        <section className='pb-16 pt-6 md:pt-8'>
          <div className='rounded-[2rem] border border-base-300 bg-base-200/55 p-6 text-center md:p-8'>
            <h1 className='text-2xl font-semibold text-base-content'>
              This meal is not available right now
            </h1>
            <p className='mt-4 text-sm leading-7 text-base-content/70 md:text-base'>
              {mealError?.message || 'Please try again after the page reloads.'}
            </p>
          </div>
        </section>
      </Container>
    )
  }

  if (!mealData) {
    return (
      <Container>
        <section className='pb-16 pt-6 md:pt-8'>
          <div className='rounded-[2rem] border border-base-300 bg-base-200/55 p-6 text-center md:p-8'>
            <h1 className='text-2xl font-semibold text-base-content'>
              This meal could not be found
            </h1>
          </div>
        </section>
      </Container>
    )
  }

  const {
    foodName,
    description,
    chefName,
    chefId,
    ingredients: rawIngredients,
    chefExperience,
    estimatedDeliveryTime,
    foodImage,
    price,
    rating,
    _id,
  } = mealData

  const ingredients = Array.isArray(rawIngredients) ? rawIngredients.filter(Boolean) : []
  const mealDescription = getMealDescription({
    foodName,
    description,
    chefName,
    ingredients,
    chefExperience,
    estimatedDeliveryTime,
    price,
  })
  const deliveryText = estimatedDeliveryTime
    ? `${estimatedDeliveryTime.minTime} to ${estimatedDeliveryTime.maxTime} minutes`
    : 'Delivery timing is shared by the chef after order confirmation.'

  const totalReviewPages = Math.max(1, Math.ceil(reviews.length / reviewsPerPage))
  const activeReviewPage = Math.min(reviewPage, totalReviewPages)
  const reviewStartIndex = (activeReviewPage - 1) * reviewsPerPage
  const visibleReviews = reviews.slice(
    reviewStartIndex,
    reviewStartIndex + reviewsPerPage
  )

  const handleAddToFavorite = async () => {
    if (!user?.email) {
      toast.error('Please log in to save meals to your favorites')
      return
    }

    const favoriteFood = {
      userEmail: user.email,
      mealName: foodName,
      chefId,
      chefName,
      price,
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/favorite/${_id}`,
        favoriteFood
      )

      if (response.data.insertedId) {
        toast.success('Successfully added to your favorites')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not add this meal to favorites')
    }
  }

  const openPurchaseModal = () => {
    if (!user?.email) {
      toast.error('Please log in to place an order')
      return
    }

    setIsPurchaseModalOpen(true)
  }

  const openReviewModal = () => {
    if (!user?.email) {
      toast.error('Please log in to write a review')
      return
    }

    setIsReviewModalOpen(true)
  }

  const openChatModal = () => {
    if (!user?.email) {
      toast.error('Please log in to message this chef')
      navigate('/login', { state: location.pathname })
      return
    }

    if (role !== 'user') {
      return
    }

    setIsChatModalOpen(true)
  }

  const showChatButton = !user || (!isRoleLoading && role === 'user')

  return (
    <section className='pb-16 pt-6 md:pb-20 md:pt-8'>
      <Container>
        <div className='space-y-10 md:space-y-12'>
          <section className='grid gap-8 lg:grid-cols-[1.03fr_0.97fr] lg:items-start'>
            <div className='overflow-hidden rounded-4xl border border-base-300 bg-base-100 p-3'>
              <img
                src={foodImage}
                alt={foodName}
                className='h-88 w-full rounded-3xl object-cover md:h-112 lg:h-144'
              />
            </div>

            <div className='flex flex-col gap-6'>
              <div className='space-y-4'>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                  Prepared by {chefName}
                </p>

                <div className='flex flex-wrap items-start justify-between gap-4'>
                  <h1 className='max-w-2xl text-3xl font-semibold tracking-tight text-base-content md:text-5xl'>
                    {foodName}
                  </h1>

                  <button
                    type='button'
                    onClick={handleAddToFavorite}
                    className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content transition hover:border-primary/40 hover:text-primary'
                    aria-label='Save this meal to favorites'
                  >
                    <FaRegStar className='text-lg' />
                  </button>
                </div>
              </div>

              <div className='grid gap-4 border-y border-base-300/80 py-5 sm:grid-cols-3'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                    Price
                  </p>
                  <p className='mt-2 text-xl font-semibold text-base-content'>
                    ৳{price}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                    Rating
                  </p>
                  <div className='mt-2 flex items-center gap-2 text-xl font-semibold text-base-content'>
                    <FaStar className='text-secondary' />
                    <span>{rating}/5</span>
                  </div>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                    Delivery
                  </p>
                  <p className='mt-2 text-xl font-semibold text-base-content'>
                    {deliveryText}
                  </p>
                </div>
              </div>

              <div>
                <h2 className='text-xl font-semibold text-base-content'>Ingredients</h2>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {ingredients.map(ingredient => (
                    <span
                      key={ingredient}
                      className='rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm text-base-content/75'
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className='space-y-3 text-sm leading-7 text-base-content/72 md:text-base'>
                <p>
                  <span className='font-semibold text-base-content'>{chefName}</span>{' '}
                  has {chefExperience} years of cooking experience and prepares this
                  meal with a repeat-order kitchen workflow in mind.
                </p>
                <p>
                  Payment opens after the chef accepts the order, so the checkout
                  flow stays clear for both sides.
                </p>
              </div>

              <div className='flex flex-wrap gap-3'>
                <button
                  type='button'
                  onClick={openPurchaseModal}
                  className='btn btn-primary rounded-full px-6'
                >
                  Order now
                </button>
                <button
                  type='button'
                  onClick={openReviewModal}
                  className='btn btn-outline rounded-full px-6'
                >
                  Write a review
                </button>
              </div>
            </div>
          </section>

          <section className='pt-8 md:pt-10'>
            <div>
              <h2 className='mt-4 text-3xl font-semibold tracking-tight text-base-content md:text-3xl'>
                Meal Description
              </h2>
              <p className='mt-5 text-sm leading-8 text-base-content/72 md:text-base'>
                {mealDescription}
              </p>
            </div>
          </section>

          <section className='border-t border-base-300/80 pt-8 md:pt-10'>
            <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
              <div>
                <h2 className='text-3xl font-semibold text-base-content md:text-4xl'>
                  Customer reviews
                </h2>
               
              </div>

              <div className='flex flex-wrap items-center gap-3'>
                <span className='rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content/70'>
                  {formatReviewCount(reviews.length)}
                </span>
                <button
                  type='button'
                  onClick={openReviewModal}
                  className='btn btn-primary rounded-full px-6'
                >
                  Write a review
                </button>
              </div>
            </div>

            {isReviewsLoading ? (
              <div className='mt-8'>
                <LoadingSpinner smallHeight />
              </div>
            ) : isReviewsError ? (
              <div className='mt-8 rounded-[1.75rem] border border-base-300 bg-base-100 p-6 text-center'>
                <h3 className='text-xl font-semibold text-base-content'>
                  Reviews are not available right now
                </h3>
                <p className='mt-3 text-sm leading-7 text-base-content/70 md:text-base'>
                  {reviewsError?.message || 'Please try again in a little while.'}
                </p>
              </div>
            ) : reviews.length === 0 ? (
              <div className='mt-8 rounded-[1.75rem] border border-base-300 bg-base-100 p-6 text-center'>
                <h3 className='text-xl font-semibold text-base-content'>
                  No reviews yet
                </h3>
                <p className='mt-3 text-sm leading-7 text-base-content/70 md:text-base'>
                  Be the first customer to share what this meal felt like after it
                  arrived.
                </p>
              </div>
            ) : (
              <>
                <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
                  {visibleReviews.map(review => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>

                <div className='mt-10 flex flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-base-300 bg-base-100 px-5 py-6 text-center sm:flex-row'>
                  <button
                    type='button'
                    onClick={() =>
                      setReviewPage(currentPage =>
                        Math.max(Math.min(currentPage, totalReviewPages) - 1, 1)
                      )
                    }
                    disabled={activeReviewPage === 1}
                    className='btn btn-outline rounded-full px-6 disabled:opacity-50'
                  >
                    Prev
                  </button>

                  <span className='text-sm font-medium text-base-content/70'>
                    Page {activeReviewPage} of {totalReviewPages}
                  </span>

                  <button
                    type='button'
                    onClick={() =>
                      setReviewPage(currentPage =>
                        Math.min(Math.min(currentPage, totalReviewPages) + 1, totalReviewPages)
                      )
                    }
                    disabled={activeReviewPage === totalReviewPages}
                    className='btn btn-primary rounded-full px-6 disabled:opacity-50'
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </Container>

      <ReviewModal
        isOpenReview={isReviewModalOpen}
        closeModalReview={() => setIsReviewModalOpen(false)}
        id={_id}
        foodName={foodName}
        refetch={refetch}
      />

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        closeModal={() => setIsPurchaseModalOpen(false)}
        mealData={mealData}
      />

      {showChatButton && (
        <button
          type='button'
          onClick={openChatModal}
          className='fixed bottom-6 right-4 z-20 flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-content shadow-lg transition hover:brightness-95 sm:bottom-8 sm:right-8'
        >
          <BsChatDotsFill className='h-4 w-4' />
          <span>Message chef</span>
        </button>
      )}

      <ChatModal
        chefId={chefId}
        chefName={chefName}
        isOpen={isChatModalOpen}
        closeModal={() => setIsChatModalOpen(false)}
      />
    </section>
  )
}

export default MealDetails
