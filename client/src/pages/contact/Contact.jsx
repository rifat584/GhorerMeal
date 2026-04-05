import { useEffect } from 'react'
import { Link } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import Container from '../../components/Shared/Container'
import useAuth from '../../hooks/useAuth'

const labelClassName =
  'text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'
const inputClassName =
  'w-full rounded-2xl border border-base-300 bg-base-100 px-4 py-3 text-sm text-base-content outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-base-200 disabled:text-base-content/45'

const getContactFormDefaults = ({ name = '', email = '' } = {}) => ({
  name,
  email,
  phone: '',
  subject: 'Order help',
  message: '',
})

const Contact = () => {
  const { user } = useAuth()
  const fullName = user?.displayName || ''
  const email = user?.email || ''

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getContactFormDefaults({ name: fullName, email }),
  })

  useEffect(() => {
    reset(getContactFormDefaults({ name: fullName, email }))
  }, [email, fullName, reset])

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: formData =>
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/contact-requests`, formData),
    onSuccess: () => {
      toast.success('Your message has been sent')
      reset(getContactFormDefaults({ name: fullName, email }))
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Could not send your message')
    },
  })

  return (
    <div className='pb-16 pt-6 md:pb-20 md:pt-8'>
      <Container>
        <section className='rounded-[2rem] border border-base-300 bg-base-200/55 p-6 md:p-8'>
          <div className='grid gap-10 xl:grid-cols-[0.88fr_1.12fr] xl:items-start'>
            <div>
              <h1 className='mt-4 text-3xl font-semibold tracking-tight text-base-content md:text-5xl'>
                Contact Us
              </h1>

              <div className='mt-8 space-y-5'>
                <div className='border-t border-base-300/80 pt-5 first:border-none first:pt-0'>
                  <p className={labelClassName}>Email</p>
                  <a
                    href='mailto:hello@ghorermeal.com'
                    className='mt-3 block text-lg font-semibold text-base-content'
                  >
                    contactwithrifat@gmail.com
                  </a>
                </div>

                <div className='border-t border-base-300/80 pt-5'>
                  <p className={labelClassName}>Phone</p>
                  <a
                    href='tel:+8801712345678'
                    className='mt-3 block text-lg font-semibold text-base-content'
                  >
                    +880 1980 185 004
                  </a>
                  <p className='mt-3 text-sm leading-7 text-base-content/72'>
                    Good for urgent delivery concerns during active support hours.
                  </p>
                </div>

                <div className='border-t border-base-300/80 pt-5'>
                  <p className={labelClassName}>Hours and location</p>
                  <p className='mt-3 text-lg font-semibold text-base-content'>
                    Every day, 9:00 AM to 10:00 PM
                  </p>
                  <p className='mt-2 text-sm leading-7 text-base-content/72'>
                    Dhanmondi, Dhaka
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-[1.5rem] border border-base-300 bg-base-100 p-5 md:p-6'>
              
                <h2 className='text-2xl font-semibold tracking-tight text-base-content'>
                  Send a message
                </h2>
                
           

              <form onSubmit={handleSubmit(data => sendMessage(data))} className='mt-6 space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <label className={labelClassName}>Full name</label>
                    <input
                      {...register('name', { required: 'Full name is required' })}
                      className={inputClassName}
                      placeholder='Your name'
                    />
                    {errors.name && (
                      <p className='text-sm text-error'>{errors.name.message}</p>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label className={labelClassName}>Email address</label>
                    <input
                      type='email'
                      {...register('email', { required: 'Email is required' })}
                      className={inputClassName}
                      placeholder='you@example.com'
                    />
                    {errors.email && (
                      <p className='text-sm text-error'>{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className='grid gap-4 sm:grid-cols-[0.9fr_1.1fr]'>
                  <div className='space-y-2'>
                    <label className={labelClassName}>Phone number</label>
                    <input
                      {...register('phone')}
                      className={inputClassName}
                      placeholder='Optional'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className={labelClassName}>Subject</label>
                    <select
                      {...register('subject', { required: 'Please choose a subject' })}
                      className={inputClassName}
                    >
                      <option>Order help</option>
                      <option>Chef partnership</option>
                      <option>Delivery issue</option>
                      <option>Account support</option>
                      <option>Other</option>
                    </select>
                    {errors.subject && (
                      <p className='text-sm text-error'>{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className={labelClassName}>Message</label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    className={`${inputClassName} min-h-36`}
                    placeholder='Tell us what you need help with'
                  />
                  {errors.message && (
                    <p className='text-sm text-error'>{errors.message.message}</p>
                  )}
                </div>

                <div className='flex flex-col gap-3 border-t border-base-300 pt-5 sm:flex-row sm:items-center sm:justify-between'>
                  <p className='text-sm leading-7 text-base-content/68'>
                    We usually reply during support hours.
                  </p>

                  <button
                    type='submit'
                    disabled={isPending}
                    className='btn btn-primary rounded-full px-6'
                  >
                    {isPending ? 'Sending...' : 'Send message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className='mt-10 rounded-[2rem] border border-base-300 bg-base-200/55 p-6 md:mt-12 md:p-8'>
          <div className='grid gap-8 md:grid-cols-3'>
            <div>
              <p className={labelClassName}>Order help</p>
              <p className='mt-4 text-sm leading-8 text-base-content/72 md:text-base'>
                Reach out if a delivery is running late, a payment step feels unclear,
                or an order needs follow-up.
              </p>
            </div>

            <div>
              <p className={labelClassName}>Chef partnerships</p>
              <p className='mt-4 text-sm leading-8 text-base-content/72 md:text-base'>
                Use the contact form if you want to talk before applying or if you
                run a kitchen with an existing repeat customer base.
              </p>
            </div>

            <div>
              <p className={labelClassName}>Service growth</p>
              <p className='mt-4 text-sm leading-8 text-base-content/72 md:text-base'>
                We are growing carefully, so questions about areas, delivery coverage,
                and future zones are welcome too.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default Contact
