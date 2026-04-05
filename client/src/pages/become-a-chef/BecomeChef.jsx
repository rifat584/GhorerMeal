import { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import Container from '../../components/Shared/Container'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import queryFetch from '../../utilitis/queryFetch'

const labelClassName =
  'text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'
const inputClassName =
  'w-full rounded-2xl border border-base-300 bg-base-100 px-4 py-3 text-sm text-base-content outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-base-200 disabled:text-base-content/45'

const getChefApplicationDefaults = ({
  fullName = '',
  email = '',
  area = '',
} = {}) => ({
  fullName,
  email,
  password: '',
  confirmPassword: '',
  phone: '',
  area,
  experience: '',
  specialties: '',
  message: '',
})

const BecomeChefPage = () => {
  const { user, createUser, updateUserProfile, setLoading } = useAuth()
  const navigate = useNavigate()
  const userEmail = user?.email || ''

  const { data: accountData, isLoading: isAccountLoading } = useQuery({
    queryKey: ['public-chef-account', userEmail],
    enabled: !!userEmail,
    queryFn: () => queryFetch(`user/${userEmail}`),
  })

  const accountName = accountData?.name || user?.displayName || ''
  const accountAddress = accountData?.address || ''
  const accountHasChefAccess =
    accountData?.role === 'chef' || accountData?.role === 'admin'

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getChefApplicationDefaults({
      fullName: accountName,
      email: userEmail,
      area: accountAddress,
    }),
  })

  const password = useWatch({ control, name: 'password' })

  useEffect(() => {
    reset(
      getChefApplicationDefaults({
        fullName: accountName,
        email: userEmail,
        area: accountAddress,
      })
    )
  }, [accountAddress, accountName, reset, userEmail])

  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: async formData => {
      const requestData = {
        userName: formData.fullName,
        userEmail: user ? user.email : formData.email,
        requestType: 'chef',
        requestStatus: 'pending',
        requestTime: new Date().toISOString(),
        phone: formData.phone,
        address: formData.area,
        cookingExperience: formData.experience,
        specialties: formData.specialties,
        message: formData.message,
      }

      if (user) {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/roles`, requestData)
        return { createdAccount: false }
      }

      const profileImage = '/favicon.png'

      await createUser(formData.email, formData.password)
      await updateUserProfile(formData.fullName, profileImage)

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, {
        name: formData.fullName,
        email: formData.email,
        profileImage,
        address: formData.area,
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString(),
      })

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/roles`, requestData)

      return { createdAccount: true }
    },
    onSuccess: result => {
      toast.success(
        result.createdAccount
          ? 'Account created and chef request sent'
          : 'Chef request sent for review'
      )

      reset(
        getChefApplicationDefaults({
          fullName: accountName,
          email: userEmail,
          area: accountAddress,
        })
      )

      if (result.createdAccount) {
        navigate('/dashboard/profile', { replace: true })
      }
    },
    onError: error => {
      setLoading(false)
      toast.error(
        error.response?.data?.message || error.message || 'Could not send request'
      )
    },
  })

  const isCreateAccountMode = !user
  const isFormDisabled = isPending

  if (userEmail && isAccountLoading) {
    return <LoadingSpinner />
  }

  if (accountHasChefAccess) {
    return <Navigate to='/dashboard/profile' replace />
  }

  return (
    <div className='pb-16 pt-6 md:pb-20 md:pt-8'>
      <Container>
        <section className='rounded-[2rem] border border-base-300 bg-base-200/55 p-6 md:p-8'>
          <div className='grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-start'>
            <div>
              <h1 className='mt-4 text-3xl font-semibold tracking-tight text-base-content md:text-5xl'>
                Become a chef
              </h1>
              <p className='mt-6 text-sm leading-8 text-base-content/72 md:text-base'>
                This page is for cooks who already have people asking for their food
                and want a more dependable way to manage repeat orders. You can start
                here as a new user or send the shorter chef request if you already
                have an account.
              </p>

              <div className='mt-8 space-y-5'>
                <div className='border-t border-base-300/80 pt-5 first:border-none first:pt-0'>
                  <h2 className='text-lg font-semibold text-base-content'>Who fits best</h2>
                  <p className='mt-3 text-sm leading-7 text-base-content/72'>
                    Home cooks already serving neighbors, office groups, or repeat
                    families tend to benefit the most from chef access.
                  </p>
                </div>

                <div className='border-t border-base-300/80 pt-5'>
                  <h2 className='text-lg font-semibold text-base-content'>What we review</h2>
                  <p className='mt-3 text-sm leading-7 text-base-content/72'>
                    We look for consistency, delivery area clarity, and a realistic
                    sense of what meals you can offer well on a repeated basis.
                  </p>
                </div>

                <div className='border-t border-base-300/80 pt-5'>
                  <h2 className='text-lg font-semibold text-base-content'>
                    What happens after approval
                  </h2>
                  <p className='mt-3 text-sm leading-7 text-base-content/72'>
                    Your dashboard unlocks chef tools for publishing meals,
                    responding to orders, and managing your menu without extra setup.
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-[1.5rem] border border-base-300 bg-base-100 p-5 md:p-6'>
              <>
                  <div>
                    <h2 className='text-2xl font-semibold tracking-tight text-base-content'>
                      {isCreateAccountMode
                        ? 'Start your chef application'
                        : 'Send your chef request'}
                    </h2>
                    
                  </div>

                  {isCreateAccountMode ? (
                    <p className='mt-4 text-sm leading-7 text-base-content/68'>
                      Already have an account?{' '}
                      <Link
                        to='/login'
                        className='font-semibold text-primary transition hover:opacity-80'
                      >
                        Log in first
                      </Link>
                      .
                    </p>
                  ) : (
                    <div className='mt-4 rounded-[1.25rem] border border-base-300 bg-base-200/70 p-4 text-sm leading-7 text-base-content/72'>
                      Signed in as{' '}
                      <span className='font-medium text-base-content'>{userEmail}</span>
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit(data => submitApplication(data))}
                    className='mt-6 space-y-4'
                  >
                    <fieldset disabled={isFormDisabled} className='space-y-4'>
                      {isCreateAccountMode && (
                        <div className='grid gap-4 sm:grid-cols-2'>
                          <div className='space-y-2'>
                            <label className={labelClassName}>Full name</label>
                            <input
                              {...register('fullName', {
                                required: 'Full name is required',
                              })}
                              className={inputClassName}
                              placeholder='Your full name'
                            />
                            {errors.fullName && (
                              <p className='text-sm text-error'>{errors.fullName.message}</p>
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

                          <div className='space-y-2'>
                            <label className={labelClassName}>Password</label>
                            <input
                              type='password'
                              {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                  value:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                                  message:
                                    'Use 8+ characters with uppercase, lowercase, number, and symbol',
                                },
                              })}
                              className={inputClassName}
                              placeholder='Create a password'
                            />
                            {errors.password && (
                              <p className='text-sm text-error'>{errors.password.message}</p>
                            )}
                          </div>

                          <div className='space-y-2'>
                            <label className={labelClassName}>Confirm password</label>
                            <input
                              type='password'
                              {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: value =>
                                  value === password || 'Passwords do not match',
                              })}
                              className={inputClassName}
                              placeholder='Confirm your password'
                            />
                            {errors.confirmPassword && (
                              <p className='text-sm text-error'>
                                {errors.confirmPassword.message}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className='grid gap-4 sm:grid-cols-2'>
                        {!isCreateAccountMode && (
                          <div className='space-y-2'>
                            <label className={labelClassName}>Full name</label>
                            <input
                              {...register('fullName')}
                              readOnly
                              className={inputClassName}
                            />
                          </div>
                        )}

                        <div className='space-y-2'>
                          <label className={labelClassName}>Phone number</label>
                          <input
                            {...register('phone', {
                              required: 'Phone number is required',
                            })}
                            className={inputClassName}
                            placeholder='01XXXXXXXXX'
                          />
                          {errors.phone && (
                            <p className='text-sm text-error'>{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label className={labelClassName}>Service area</label>
                        <input
                          {...register('area', {
                            required: 'Service area is required',
                          })}
                          className={inputClassName}
                          placeholder='Dhanmondi, Mirpur, Uttara'
                        />
                        {errors.area && (
                          <p className='text-sm text-error'>{errors.area.message}</p>
                        )}
                      </div>

                      <div className='space-y-2'>
                        <label className={labelClassName}>Cooking experience</label>
                        <input
                          {...register('experience', {
                            required: 'Cooking experience is required',
                          })}
                          className={inputClassName}
                          placeholder='How long have you been cooking for customers?'
                        />
                        {errors.experience && (
                          <p className='text-sm text-error'>{errors.experience.message}</p>
                        )}
                      </div>

                      <div className='space-y-2'>
                        <label className={labelClassName}>Signature dishes</label>
                        <textarea
                          {...register('specialties', {
                            required: 'Signature dishes are required',
                          })}
                          className={`${inputClassName} min-h-28`}
                          placeholder='Tell us what people usually come back for'
                        />
                        {errors.specialties && (
                          <p className='text-sm text-error'>{errors.specialties.message}</p>
                        )}
                      </div>

                      
                    </fieldset>

                    <div className='flex flex-col gap-3 border-t border-base-300 pt-5 sm:flex-row sm:items-center sm:justify-between'>
                      <p className='text-sm leading-7 text-base-content/68'>
                        We review requests manually before enabling chef tools.
                      </p>

                      <button
                        type='submit'
                        disabled={isFormDisabled}
                        className='btn btn-primary rounded-full px-6'
                      >
                        {isPending
                          ? 'Sending...'
                          : isCreateAccountMode
                            ? 'Create account and apply'
                            : 'Send chef request'}
                      </button>
                    </div>
                  </form>
                </>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default BecomeChefPage
