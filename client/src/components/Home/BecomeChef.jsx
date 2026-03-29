import { Link } from 'react-router'
import Container from '../Shared/Container'

const BecomeChef = () => {
  return (
    <section className='bg-base-200/45 py-18'>
      <Container>
        <div className='grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12'>
          <div className='overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 p-3 shadow-sm sm:p-4'>
            <img
              src='/chef-growth.jpg'
              alt='A chef preparing plated food in a professional kitchen'
              className='h-72 w-full rounded-[1.5rem] object-cover md:h-[420px]'
            />
          </div>

          <div className='max-w-2xl'>
            <header className='max-w-3xl'>
              <h2 className='text-3xl font-semibold text-base-content md:text-4xl'>
                Good local cooks should have a place to grow
              </h2>
              <p className='mt-4 text-sm leading-7 text-base-content/72 md:text-base'>
                Many home chefs already have loyal customers through word of mouth.
                Ghorer Meal gives them a cleaner way to present meals, earn repeat
                orders, and build trust online.
              </p>
            </header>

            <div className='mt-8 grid gap-4 sm:grid-cols-2'>
              <article className='rounded-[1.75rem] border border-base-300 bg-base-100 p-5 shadow-sm'>
                <h3 className='text-lg font-semibold text-base-content'>Show meals clearly</h3>
                <p className='mt-3 text-sm leading-7 text-base-content/70'>
                  Add dishes with pricing, ingredients, and timing customers can
                  understand fast.
                </p>
              </article>

              <article className='rounded-[1.75rem] border border-base-300 bg-base-100 p-5 shadow-sm'>
                <h3 className='text-lg font-semibold text-base-content'>Build repeat trust</h3>
                <p className='mt-3 text-sm leading-7 text-base-content/70'>
                  Good reviews and consistent service help real cooks grow beyond one-time
                  orders.
                </p>
              </article>
            </div>

            <div className='mt-8 flex flex-wrap gap-3'>
              <Link to='/become-a-chef' className='btn btn-primary rounded-full px-6'>
                Become a Chef
              </Link>
              <Link to='/signup' className='btn btn-outline rounded-full px-6'>
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default BecomeChef
