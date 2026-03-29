import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'

import ReviewCard from './ReviewCard'
import queryFetch from '../../utilitis/queryFetch'
import LoadingSpinner from '../Shared/LoadingSpinner'
import Container from '../Shared/Container'

const ReviewsSection = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => queryFetch('reviews'),
  })

  if (isLoading) return <LoadingSpinner />

  if (reviews.length === 0) {
    return (
      <section className='bg-base-100 py-18'>
        <Container>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-base-content'>Customer Reviews</h2>
            <p className='mt-4 text-base-content/65'>No reviews yet.</p>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className='bg-base-100 py-18'>
      <Container>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold text-base-content md:text-4xl'>
            What customers say after the first few orders
          </h2>
          <p className='mt-4 text-sm leading-7 text-base-content/70 md:text-base'>
            Ratings and reviews help new customers order with more confidence and
            help reliable cooks build stronger repeat business.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          className='mt-12 pb-12'
          breakpoints={{
            640: { slidesPerView: 1.1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {reviews.map(review => (
            <SwiperSlide key={review._id} className='h-auto'>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}

export default ReviewsSection
