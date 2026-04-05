import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'

const inputClassName =
  'w-full rounded-2xl border border-base-300 bg-base-100 px-4 py-3 text-sm text-base-content outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10'

const ReviewModal = ({ isOpenReview, closeModalReview, id, foodName, refetch }) => {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: '5',
      comment: '',
    },
  })

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: async formData => {
      const mealReviewData = {
        reviewerName: user?.displayName,
        reviewerImage: user?.photoURL,
        reviewerEmail: user?.email,
        rating: formData.rating,
        comment: formData.comment,
        foodName,
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/review/${id}`,
        mealReviewData
      )

      return response.data
    },
    onSuccess: data => {
      if (data.insertedId) {
        toast.success('Your review has been added')
        refetch()
      }

      reset()
      closeModalReview()
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Could not add your review')
    },
  })

  return (
    <Dialog
      open={isOpenReview}
      onClose={isPending ? () => {} : closeModalReview}
      className='relative z-50 focus:outline-none'
    >
      <div className='fixed inset-0 bg-base-content/45 backdrop-blur-sm' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel
          transition
          className='w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 sm:p-7'
        >
          <div className='space-y-6'>
            <header className='space-y-3'>
              <DialogTitle className='text-2xl font-semibold tracking-tight text-base-content'>
                Write a review
              </DialogTitle>
              <p className='text-sm leading-7 text-base-content/70'>
                Share what stood out about{' '}
                <span className='font-medium text-base-content'>{foodName}</span>{' '}
                so other customers can order with more confidence.
              </p>
            </header>

            <div className='grid gap-4 rounded-[1.5rem] border border-base-300 bg-base-200/70 p-4 sm:grid-cols-2'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                  Meal
                </p>
                <p className='mt-2 text-sm font-medium text-base-content'>{foodName}</p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                  Posting as
                </p>
                <p className='mt-2 text-sm font-medium text-base-content'>
                  {user?.email || 'Signed-in account'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(data => submitReview(data))} className='space-y-5'>
              <div className='space-y-2 text-sm'>
                <label className='font-medium text-base-content/75'>Rating</label>
                <select
                  {...register('rating', {
                    required: { value: true, message: 'Please select a rating' },
                  })}
                  className={inputClassName}
                >
                  <option value='5'>5 - Excellent</option>
                  <option value='4'>4 - Very good</option>
                  <option value='3'>3 - Good</option>
                  <option value='2'>2 - Fair</option>
                  <option value='1'>1 - Poor</option>
                </select>
                {errors.rating && (
                  <p className='text-sm text-error'>{errors.rating.message}</p>
                )}
              </div>

              <div className='space-y-2 text-sm'>
                <label className='font-medium text-base-content/75'>Comment</label>
                <textarea
                  {...register('comment', {
                    required: { value: true, message: 'Please write your review' },
                  })}
                  placeholder='Share what felt fresh, reliable, or worth ordering again'
                  className={`${inputClassName} min-h-32`}
                />
                {errors.comment && (
                  <p className='text-sm text-error'>{errors.comment.message}</p>
                )}
              </div>

              <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                <button
                  type='button'
                  onClick={closeModalReview}
                  disabled={isPending}
                  className='btn rounded-full border border-base-300 bg-base-100 px-6 text-base-content hover:bg-base-200 disabled:border-base-300 disabled:bg-base-100 disabled:text-base-content/50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isPending}
                  className='btn btn-primary rounded-full px-6'
                >
                  {isPending ? 'Submitting...' : 'Submit review'}
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default ReviewModal
