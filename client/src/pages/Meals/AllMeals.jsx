import Meals from '../../components/Home/Meals'
import Container from '../../components/Shared/Container'

const AllMeals = () => {
  return (
    <section className='pb-16 pt-10'>
      <Container>
        <div className='rounded-[2rem] border border-base-300 bg-base-200/70 px-6 py-8 md:px-10 md:py-10'>
          <p className='text-sm font-semibold uppercase tracking-[0.25em] text-primary'>
            Meals Directory
          </p>
          <h1 className='mt-3 max-w-3xl font-display text-3xl font-semibold md:text-5xl'>
            Explore daily dishes, family platters, and chef-made comfort food
          </h1>
          <p className='mt-4 max-w-2xl text-sm leading-7 text-base-content/70 md:text-base'>
            Browse home-style menus from local kitchens, compare delivery windows,
            and choose meals that fit both busy weekdays and slower family evenings.
          </p>
        </div>
      </Container>
      <Meals />
    </section>
  )
}

export default AllMeals
