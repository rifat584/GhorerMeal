import { useNavigate } from 'react-router'
import Logo from '../components/Shared/Logo'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <main className='min-h-screen bg-base-200/55 px-4 py-8 text-base-content sm:px-6 lg:px-8'>
      <div className='mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center'>
        <section className='w-full rounded-[2rem] border border-base-300/70 bg-base-100 px-6 py-10 shadow-sm sm:px-10 sm:py-12'>
          <div className='mx-auto max-w-2xl text-center'>
            <div className='mt-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.7'
                stroke='currentColor'
                className='h-7 w-7'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m0 3.75h.008v.008H12v-.008Zm8.25-3.75a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0Z'
                />
              </svg>
            </div>

            <h1 className='mt-6 text-3xl font-semibold tracking-tight text-base-content md:text-5xl'>
              This page is not available right now
            </h1>
            <p className='mx-auto mt-4 max-w-xl text-sm leading-7 text-base-content/70 md:text-base'>
              The link may have changed, or this part of the site may have run
              into a problem. You can head back or return home and keep browsing.
            </p>

            <div className='mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center'>
              <button
                type='button'
                onClick={() => navigate(-1)}
                className='btn btn-ghost rounded-full border border-base-300 bg-base-100 px-6'
              >
                Go back
              </button>
              <button
                type='button'
                onClick={() => navigate('/')}
                className='btn btn-primary rounded-full px-6'
              >
                Take me home
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ErrorPage
