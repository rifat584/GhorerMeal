const ReviewCard = ({ review }) => {
  const reviewDate = new Date(review.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className='flex h-84 flex-col justify-between gap-8 overflow-hidden rounded-4xl border border-base-300 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg cursor-pointer select-none'>
      <div className='space-y-5'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-sm text-base-content/55'>{reviewDate}</p>
            <h3 className='mt-2 text-lg font-semibold text-base-content'>
              {review.foodName}
            </h3>
          </div>

          <div className='text-right'>
            <p className='text-sm font-semibold text-base-content'>Rating</p>
            <p className='mt-1 text-base text-secondary'>{review.rating}/5</p>
          </div>
        </div>

        <p className='line-clamp-4 text-base leading-8 text-base-content/72'>
          {review.comment}
        </p>
      </div>

      <div className='flex items-center justify-between gap-4 border-t border-base-300 pt-5 mt-auto'>
        <div className='flex items-center gap-3'>
          <img
            src={review.reviewerImage || '/ghorermeal.png'}
            alt={review.reviewerName}
            className='h-12 w-12 rounded-full object-cover'
          />
          <div>
            <p className='font-semibold text-base-content'>{review.reviewerName}</p>
            <p className='text-sm text-base-content/55'>Verified customer</p>
          </div>
        </div>

        <div className='flex items-center gap-1 text-lg'>
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={index < review.rating ? 'text-secondary' : 'text-base-300'}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default ReviewCard
