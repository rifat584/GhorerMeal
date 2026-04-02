import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import AuthShell from '../../components/Shared/AuthShell'
import useAuth from '../../hooks/useAuth'

const inputClassName =
  'w-full rounded-2xl border border-base-300 bg-base-200/55 px-4 py-3 text-base-content outline-none transition placeholder:text-base-content/35 focus:border-primary/60 focus:bg-base-100'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace />

  const loginWithEmail = async (data) => {
    const { email, password } = data

    try {
      await signIn(email, password)
      navigate(from, { replace: true })
      toast.success('Login successful')
    } catch (err) {
      setLoading(false)
      toast.error(err?.message)
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
      toast.success('Login successful')
    } catch (err) {
      setLoading(false)
      toast.error(err?.message)
    }
  }

  return (
    <AuthShell
      title='Sign in to your Ghorer Meal account'
      imageSrc='/hero.jpg'
      imageAlt='A plated home-style meal with rice, vegetables, and fresh toppings'
    >
      <form onSubmit={handleSubmit(loginWithEmail)} className='space-y-5' noValidate>
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
            })}
          />
          {errors.email && <p className='mt-2 text-sm text-error'>{errors.email.message}</p>}
        </div>

        <div>
          <div className='mb-2 flex items-center justify-between gap-3'>
            <label htmlFor='password' className='block text-sm font-medium text-base-content/80'>
              Password
            </label>
            <button
              type='button'
              className='text-sm text-base-content/60 transition hover:text-primary'
            >
              Forgot password?
            </button>
          </div>
          <input
            id='password'
            type='password'
            autoComplete='current-password'
            placeholder='Enter your password'
            className={inputClassName}
            {...register('password', {
              required: {
                value: true,
                message: 'Please enter your password',
              },
            })}
          />
          {errors.password && (
            <p className='mt-2 text-sm text-error'>{errors.password.message}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={loading}
          className='btn btn-primary h-13 w-full rounded-full border-0 text-base'
        >
          {loading ? <TbFidgetSpinner className='animate-spin text-xl' /> : 'Sign in'}
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
        Don&apos;t have an account yet?{' '}
        <Link state={from} to='/signup' className='font-semibold text-primary transition hover:opacity-80'>
          Create one
        </Link>
      </p>
    </AuthShell>
  )
}

export default Login
