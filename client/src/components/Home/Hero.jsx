import { motion } from 'motion/react'
import { Link } from 'react-router'
import Container from '../Shared/Container'

const Hero = () => {
  return (
    <section className='overflow-hidden border-b border-base-300 bg-base-100'>
      <Container>
        <div className='grid items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-22'>
          <motion.div
            className='max-w-2xl'
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <motion.h1
              className='text-4xl leading-tight font-semibold text-base-content sm:text-5xl lg:text-6xl'
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
            >
              Home-cooked meals that make busy days feel lighter.
            </motion.h1>

            <motion.p
              className='mt-5 max-w-xl text-base leading-8 text-base-content/72 sm:text-lg'
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.14 }}
            >
              Find familiar lunches and dinners from nearby home chefs, prepared
              with care and delivered in a way that fits everyday life.
            </motion.p>

            <motion.div
              className='mt-8 flex flex-wrap gap-3'
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.22 }}
            >
              <Link to='/all-meals' className='btn btn-primary rounded-full px-6'>
                Explore Meals
              </Link>
              <Link to='/become-a-chef' className='btn btn-outline rounded-full px-6'>
                Become a Chef
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className='relative'
            initial={{ opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.12 }}
          >
            <div
              aria-hidden='true'
              className='absolute -left-6 top-10 h-24 w-24 rounded-full bg-secondary/20 blur-2xl sm:h-32 sm:w-32'
            />
            <div
              aria-hidden='true'
              className='absolute -right-4 bottom-8 h-28 w-28 rounded-full bg-accent/18 blur-2xl sm:h-36 sm:w-36'
            />

            <div className='relative overflow-hidden rounded-4xl border border-base-300 bg-base-200 p-3 shadow-xl sm:p-4'>
              <img
                src='/hero.jpg'
                alt='Home-style rice, curry, and fresh sides arranged for a family meal'
                className='h-80 w-full rounded-3xl object-cover sm:h-[380px] lg:h-[460px]'
              />
            </div>

            <motion.article
              className='absolute bottom-4 left-4 max-w-68 rounded-[1.75rem] border border-base-300 bg-base-100/96 px-4 py-4 shadow-lg backdrop-blur sm:bottom-6 sm:left-6 sm:px-5'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.38 }}
            >
              <p className='text-sm font-medium text-base-content/58'>
                Most loved this week
              </p>
              <p className='mt-2 text-lg font-semibold leading-snug text-base-content'>
                Fresh lunch boxes and family curries from local kitchens
              </p>
            </motion.article>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
