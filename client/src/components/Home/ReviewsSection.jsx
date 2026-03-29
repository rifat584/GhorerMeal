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

  return (
    <section className='bg-base-100 py-18'>
      <Container>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold text-base-content md:text-5xl'>
           Why people come back after the first order
          </h2>
          <p className='mt-4 text-sm leading-7 text-base-content/70 md:text-base'>
           Ratings and written feedback make it easier to judge consistency, trust the chef behind the meal, and decide what feels worth trying first.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className='mt-12 pb-12'
          breakpoints={{
            640: { slidesPerView: 1.1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {reviews.map(review => (
            <SwiperSlide key={review._id} className='h-auto p-2'>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}

export default ReviewsSection
