import { Link } from 'react-router'
import Container from './Container'
import Logo from './Logo'

const AuthShell = ({
  title,
  imageSrc,
  imageAlt,
  children,
}) => {
  return (
    <main className='min-h-screen bg-base-100 py-6 sm:py-8 lg:py-10'>
      <Container>
          <Link to='/' className='btn btn-ghost rounded-full px-5'>
            Back home
          </Link>
        <section className='mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-8 xl:gap-10'>
          <article className='flex h-full flex-col rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8 lg:p-10'>
            <header className='max-w-xl'>
              <h1 className='text-4xl font-semibold leading-tight text-base-content sm:text-5xl'>
                {title}
              </h1>
            </header>

            <div className='mt-8 flex-1'>{children}</div>
          </article>

          <aside className='relative hidden h-full overflow-hidden rounded-[2.25rem] border border-base-300 bg-base-200 p-4 shadow-xl lg:block lg:p-5'>
            <div
              aria-hidden='true'
              className='absolute -left-6 top-10 h-28 w-28 rounded-full bg-secondary/18 blur-2xl'
            />
            <div
              aria-hidden='true'
              className='absolute -right-6 bottom-10 h-32 w-32 rounded-full bg-accent/14 blur-2xl'
            />

            <div className='relative h-full min-h-[34rem] overflow-hidden rounded-[1.9rem] border border-base-300/80 bg-base-100 shadow-lg'>
              <img
                src={imageSrc}
                alt={imageAlt}
                className='h-full w-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/32 via-transparent to-transparent' />
            </div>
          </aside>
        </section>
      </Container>
    </main>
  )
}

export default AuthShell
