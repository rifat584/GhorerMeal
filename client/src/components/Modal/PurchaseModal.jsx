import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'

const inputClassName =
  'w-full rounded-2xl border border-base-300 bg-base-100 px-4 py-3 text-sm text-base-content outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10'

const PurchaseModal = ({ closeModal, isOpen, mealData }) => {
  const { user } = useAuth()
  const { foodName, price, chefId, _id, chefName, estimatedDeliveryTime } = mealData

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
      address: '',
    },
  })

  const quantity = Number(useWatch({ control, name: 'quantity' }) || 1)
  const totalPrice = quantity * Number(price)

  const { mutate: placeOrder, isPending } = useMutation({
    mutationFn: async formData => {
      const orderInfo = {
        mealName: foodName,
        foodId: _id,
        price: Number(formData.quantity) * price,
        quantity: Number(formData.quantity),
        chefId,
        chefName,
        userEmail: user?.email,
        userAddress: formData.address,
        estimatedDeliveryTime,
        orderStatus: 'pending',
        paymentStatus: 'pending',
        orderTime: new Date().toISOString(),
      }

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/orders`, orderInfo)
    },
    onSuccess: () => {
      toast.success('Order placed successfully')
      reset()
      closeModal()
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Could not place the order')
    },
  })

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-50 focus:outline-none'
      onClose={isPending ? () => {} : closeModal}
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
                Place this order
              </DialogTitle>
              <p className='text-sm leading-7 text-base-content/70'>
                Confirm the delivery details, choose your quantity, and place the
                order. Payment happens after the chef accepts it.
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
                  Chef
                </p>
                <p className='mt-2 text-sm font-medium text-base-content'>{chefName}</p>
              </div>

              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                  Price per meal
                </p>
                <p className='mt-2 text-sm font-medium text-base-content'>{price} TK</p>
              </div>

              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                  Account
                </p>
                <p className='mt-2 text-sm font-medium text-base-content'>
                  {user?.email || 'Signed-in account'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(data => placeOrder(data))} className='space-y-5'>
              <div className='grid gap-4 sm:grid-cols-[0.82fr_1.18fr]'>
                <div className='space-y-2 text-sm'>
                  <label className='font-medium text-base-content/75'>Quantity</label>
                  <input
                    type='number'
                    min='1'
                    {...register('quantity', {
                      required: { value: true, message: 'Quantity is required' },
                      min: { value: 1, message: 'Minimum order quantity is 1' },
                      valueAsNumber: true,
                    })}
                    className={inputClassName}
                  />
                  {errors.quantity && (
                    <p className='text-sm text-error'>{errors.quantity.message}</p>
                  )}
                </div>

                <div className='space-y-2 text-sm'>
                  <label className='font-medium text-base-content/75'>Order total</label>
                  <div className='rounded-2xl border border-base-300 bg-base-200/70 px-4 py-3 text-sm font-semibold text-base-content'>
                    {totalPrice} TK
                  </div>
                </div>
              </div>

              <div className='space-y-2 text-sm'>
                <label className='font-medium text-base-content/75'>Delivery address</label>
                <textarea
                  {...register('address', {
                    required: { value: true, message: 'Address is required' },
                  })}
                  placeholder='Enter the address where this meal should be delivered'
                  className={`${inputClassName} min-h-28`}
                />
                {errors.address && (
                  <p className='text-sm text-error'>{errors.address.message}</p>
                )}
              </div>

              <div className='rounded-[1.5rem] border border-base-300 bg-base-200/70 p-4 text-sm leading-7 text-base-content/70'>
                Your payment step will open after the chef accepts this order.
              </div>

              <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                <button
                  type='button'
                  className='btn rounded-full border border-base-300 bg-base-100 px-6 text-base-content hover:bg-base-200 disabled:border-base-300 disabled:bg-base-100 disabled:text-base-content/50'
                  onClick={closeModal}
                  disabled={isPending}
                >
                  Cancel
                </button>

                <button
                  type='submit'
                  disabled={isPending}
                  className='btn btn-primary rounded-full px-6'
                >
                  {isPending ? 'Placing order...' : 'Place order'}
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default PurchaseModal
