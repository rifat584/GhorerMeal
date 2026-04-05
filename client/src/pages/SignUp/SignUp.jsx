import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import AuthShell from '../../components/Shared/AuthShell'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import uploadImage from '../../utilitis/uploadImage'

const inputClassName =
  'w-full rounded-2xl border border-base-300 bg-base-200/55 px-4 py-3 text-base-content outline-none transition placeholder:text-base-content/35 focus:border-primary/60 focus:bg-base-100'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading, setLoading, user } =
    useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password')

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace />

  const registerUserWithEmail = async (data) => {
    const { name, email, image, password, address } = data

    try {
      const photo = await uploadImage(image)
      await createUser(email, password)
      await updateUserProfile(name, photo)

      const userData = {
        name,
        email,
        profileImage: photo,
        address,
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString(),
      }
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, userData)

      navigate(from, { replace: true })
      toast.success('Signup successful')
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const response = await signInWithGoogle()
      const signedInUser = response.user
      const userData = {
        name: signedInUser?.displayName,
        email: signedInUser?.email,
        profileImage: signedInUser?.photoURL,
        address: 'N/A',
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString(),
      }
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, userData)
      navigate(from, { replace: true })
      toast.success('Signup successful')
    } catch (err) {
      setLoading(false)
      toast.error(err?.message)
    }
  }

  return (
    <AuthShell
      title='Create your Ghorer Meal account'
      imageSrc='/home-chef.jpg'
      imageAlt='A chef preparing food in a bright home kitchen'
    >
      <form onSubmit={handleSubmit(registerUserWithEmail)} className='space-y-5' noValidate>
        <div className='grid gap-5 sm:grid-cols-2'>
          <div>
            <label htmlFor='name' className='mb-2 block text-sm font-medium text-base-content/80'>
              Full name
            </label>
            <input
              id='name'
              type='text'
              placeholder='Enter your full name'
              className={inputClassName}
              {...register('name', {
                required: {
                  value: true,
                  message: 'Please enter your full name',
                },
                pattern: {
                  value: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
                  message: 'Please enter your last name',
                },
              })}
            />
            {errors.name && <p className='mt-2 text-sm text-error'>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor='email' className='mb-2 block text-sm font-medium text-base-content/80'>
              Email address
            </label>
            <input
              id='email'
              type='email'
              autoComplete='email'
              placeholder='Enter your email'
              className={inputClassName}
              {...register('email', {
                required: { value: true, message: 'Please enter your email' },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email',
                },
              })}
            />
            {errors.email && <p className='mt-2 text-sm text-error'>{errors.email.message}</p>}
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='address'
              className='mb-2 block text-sm font-medium text-base-content/80'
            >
              Address
            </label>
            <input
              id='address'
              type='text'
              placeholder='Enter your address'
              className={inputClassName}
              {...register('address', {
                required: {
                  value: true,
                  message: 'Please enter your address',
                },
              })}
            />
            {errors.address && (
              <p className='mt-2 text-sm text-error'>{errors.address.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-medium text-base-content/80'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              autoComplete='new-password'
              placeholder='Create a password'
              className={inputClassName}
              {...register('password', {
                required: {
                  value: true,
                  message: 'Please enter a 8 digit password',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                  message:
                    'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
                },
              })}
            />
            {errors.password && (
              <p className='mt-2 text-sm text-error'>{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='confirm-password'
              className='mb-2 block text-sm font-medium text-base-content/80'
            >
              Confirm password
            </label>
            <input
              id='confirm-password'
              type='password'
              placeholder='Confirm your password'
              className={inputClassName}
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: 'Please enter the password again',
                },
                validate: value => value === password || 'password do not match',
              })}
            />
            {errors.confirmPassword && (
              <p className='mt-2 text-sm text-error'>{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className='sm:col-span-2'>
            <label htmlFor='image' className='mb-2 block text-sm font-medium text-base-content/80'>
              Profile image
            </label>
            <input
              id='image'
              type='file'
              accept='image/*'
              className='block w-full rounded-2xl border border-dashed border-base-300 bg-base-200/55 px-4 py-3 text-sm text-base-content/70 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-content hover:file:opacity-90'
              {...register('image', {
                required: {
                  value: true,
                  message: 'Please upload your image',
                },
              })}
            />
            <p className='mt-2 text-xs text-base-content/55'>
              PNG, JPG or JPEG. Use a clear photo so chefs and customers can recognize you
              easily.
            </p>
            {errors.image && <p className='mt-2 text-sm text-error'>{errors.image.message}</p>}
          </div>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='btn btn-primary h-13 w-full rounded-full border-0 text-base'
        >
          {loading ? <TbFidgetSpinner className='animate-spin text-xl' /> : 'Create account'}
        </button>
      </form>

      <div className='my-6 flex items-center gap-4'>
        <div className='h-px flex-1 bg-base-300' />
        <p className='text-sm text-base-content/55'>or continue with Google</p>
        <div className='h-px flex-1 bg-base-300' />
      </div>

      <button
        type='button'
        onClick={handleGoogleSignIn}
        disabled={loading}
        className='flex h-13 w-full items-center justify-center gap-3 rounded-full border border-base-300 bg-base-100 px-5 text-base font-medium text-base-content transition hover:bg-base-200'
      >
        <FcGoogle className='text-2xl' />
        <span>Continue with Google</span>
      </button>

      <p className='mt-6 text-center text-sm text-base-content/65'>
        Already have an account?{' '}
        <Link
          to='/login'
          state={from}
          className='font-semibold text-primary transition hover:opacity-80'
        >
          Sign in
        </Link>
      </p>
    </AuthShell>
  )
}

export default SignUp
