import { Link } from 'react-router'
import Container from '../Container'
import Logo from '../Logo'

const Footer = () => {
  return (
    <footer className='border-t border-base-300 bg-base-200/70'>
      <Container>
        <div className='grid gap-10 py-12 md:grid-cols-2 xl:grid-cols-[1.2fr_0.9fr_0.9fr]'>
          <div className='space-y-4'>
            <div>
              <Logo />
              <p className='mt-2 max-w-xl text-sm leading-7 text-base-content/70'>
                A home-style meal platform that helps busy families discover trusted
                local cooks, dependable delivery windows, and meals that feel
                comforting from the first order.
              </p>
            </div>
            <p className='text-sm text-base-content/70'>
              Serving lunch, dinner, family platters, and weekly meal planning with a
              local-first approach.
            </p>
          </div>

          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-base-content/55'>
              Explore
            </p>
            <div className='mt-4 grid gap-3 text-sm text-base-content/75'>
              <Link to='/all-meals' className='transition hover:text-primary'>
                Meals
              </Link>
              <Link to='/about' className='transition hover:text-primary'>
                About
              </Link>
              <Link to='/how-it-works' className='transition hover:text-primary'>
                How It Works
              </Link>
              <Link to='/become-a-chef' className='transition hover:text-primary'>
                Become a Chef
              </Link>
              <Link to='/contact' className='transition hover:text-primary'>
                Contact
              </Link>
            </div>
          </div>

          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-base-content/55'>
              Contact
            </p>
            <div className='mt-4 space-y-3 text-sm text-base-content/75'>
              <p>hello@ghorermeal.com</p>
              <p>+880 1712-345678</p>
              <p>Dhanmondi, Dhaka</p>
              <p>Every day, 9:00 AM to 10:00 PM</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 border-t border-base-300/70 py-5 text-sm text-base-content/60 md:flex-row md:items-center md:justify-between'>
          <p>© {new Date().getFullYear()} Ghorer Meal. Built for everyday home-style ordering.</p>
          <p>Designed for families, local cooks, and reliable daily meals.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
