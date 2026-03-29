import { Link } from 'react-router'
import Container from '../components/Shared/Container'

const PageHeader = ({ eyebrow, title, description, primaryLink, secondaryLink }) => {
  return (
    <section className='border-b border-base-300 bg-base-100'>
      <Container>
        <div className='grid gap-8 py-12 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.25em] text-primary'>
              {eyebrow}
            </p>
            <h1 className='mt-4 max-w-3xl font-display text-4xl font-semibold md:text-5xl'>
              {title}
            </h1>
          </div>

          <div className='space-y-5'>
            <p className='text-sm leading-7 text-base-content/70 md:text-base'>
              {description}
            </p>
            <div className='flex flex-wrap gap-3'>
              <Link to={primaryLink.to} className='btn btn-primary rounded-full px-6'>
                {primaryLink.label}
              </Link>
              <Link to={secondaryLink.to} className='btn btn-outline rounded-full px-6'>
                {secondaryLink.label}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export const AboutPage = () => {
  return (
    <div className='pb-16'>
      <PageHeader
        eyebrow='About Ghorer Meal'
        title='A meal platform built around neighborhood trust and everyday comfort'
        description='Ghorer Meal is designed for people who want food that feels familiar, dependable, and worth reordering. We focus on connecting customers with nearby cooks who care about consistency as much as flavor.'
        primaryLink={{ label: 'Explore meals', to: '/all-meals' }}
        secondaryLink={{ label: 'How it works', to: '/how-it-works' }}
      />

      <section className='py-12 md:py-16'>
        <Container>
          <div className='grid gap-6 lg:grid-cols-[1.05fr_0.95fr]'>
            <article className='rounded-[2rem] border border-base-300 bg-base-100 p-8 shadow-sm md:p-10'>
              <h2 className='text-2xl font-semibold md:text-3xl'>What makes the platform feel real</h2>
              <p className='mt-4 text-sm leading-8 text-base-content/72 md:text-base'>
                We are not trying to look like a generic restaurant directory. The goal is
                to feel closer to a trusted local food network, where customers can find
                meals for office lunches, family dinners, weekly planning, and last-minute
                busy evenings without losing the warmth of home-style cooking.
              </p>
              <p className='mt-4 text-sm leading-8 text-base-content/72 md:text-base'>
                That means clearer chef profiles, more relatable meal categories, practical
                delivery expectations, and content that speaks like a real household service
                instead of an assignment project.
              </p>
            </article>

            <div className='grid gap-5 sm:grid-cols-2'>
              <article className='rounded-[2rem] border border-base-300 bg-base-200 p-6'>
                <p className='text-sm text-base-content/60'>Meal focus</p>
                <h3 className='mt-3 text-xl font-semibold'>Lunch, dinner, family trays</h3>
              </article>
              <article className='rounded-[2rem] border border-base-300 bg-base-200 p-6'>
                <p className='text-sm text-base-content/60'>Chef promise</p>
                <h3 className='mt-3 text-xl font-semibold'>Trusted local cooks with real profiles</h3>
              </article>
              <article className='rounded-[2rem] border border-base-300 bg-base-200 p-6'>
                <p className='text-sm text-base-content/60'>Customer value</p>
                <h3 className='mt-3 text-xl font-semibold'>Comfort food that fits busy schedules</h3>
              </article>
              <article className='rounded-[2rem] border border-base-300 bg-base-200 p-6'>
                <p className='text-sm text-base-content/60'>Ordering style</p>
                <h3 className='mt-3 text-xl font-semibold'>Easy repeat ordering for favorite meals</h3>
              </article>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export const HowItWorksPage = () => {
  const steps = [
    {
      title: 'Browse meals that match your day',
      description:
        'Start with meals, ratings, prices, and delivery windows that make sense for workdays, family dinners, or quick solo orders.',
    },
    {
      title: 'Choose a trusted local kitchen',
      description:
        'Every listing helps you understand who prepared the dish, what kind of food they are known for, and how quickly it can arrive.',
    },
    {
      title: 'Order with confidence and come back easily',
      description:
        'Reviews, favorite meals, and consistent menu structure make it easier to reorder the dishes that already worked for you.',
    },
  ]

  return (
    <div className='pb-16'>
      <PageHeader
        eyebrow='How it works'
        title='Simple ordering for customers, simple visibility for local chefs'
        description='The whole flow is built to feel straightforward. Customers should be able to trust what they see, and chefs should be able to present their meals clearly without overcomplicated tools.'
        primaryLink={{ label: 'Browse meals', to: '/all-meals' }}
        secondaryLink={{ label: 'Become a chef', to: '/become-a-chef' }}
      />

      <section className='py-12 md:py-16'>
        <Container>
          <div className='grid gap-5 lg:grid-cols-3'>
            {steps.map(step => (
              <article
                key={step.title}
                className='rounded-[2rem] border border-base-300 bg-base-100 p-8 shadow-sm'
              >
                <p className='text-sm font-semibold uppercase tracking-[0.25em] text-primary'>
                  Step
                </p>
                <h2 className='mt-4 text-2xl font-semibold'>{step.title}</h2>
                <p className='mt-4 text-sm leading-8 text-base-content/72 md:text-base'>
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className='mt-8 rounded-[2rem] border border-base-300 bg-base-200 p-8 md:p-10'>
            <h2 className='text-2xl font-semibold md:text-3xl'>What keeps the experience trustworthy</h2>
            <div className='mt-6 grid gap-5 md:grid-cols-3'>
              <article>
                <h3 className='text-lg font-semibold'>Transparent delivery time</h3>
                <p className='mt-3 text-sm leading-7 text-base-content/70'>
                  Customers can choose meals based on realistic timing instead of vague promises.
                </p>
              </article>
              <article>
                <h3 className='text-lg font-semibold'>Visible reviews and favorites</h3>
                <p className='mt-3 text-sm leading-7 text-base-content/70'>
                  Good meals naturally build trust through repeat ordering and customer feedback.
                </p>
              </article>
              <article>
                <h3 className='text-lg font-semibold'>Chef-first clarity</h3>
                <p className='mt-3 text-sm leading-7 text-base-content/70'>
                  Local cooks can focus on meal quality and consistency instead of learning a confusing tool.
                </p>
              </article>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export const BecomeChefPage = () => {
  return (
    <div className='pb-16'>
      <PageHeader
        eyebrow='Become a chef'
        title='Turn your trusted home kitchen into a reliable local ordering option'
        description='Ghorer Meal is a good fit for cooks who already have people asking for their food, want a cleaner online presence, and care about consistency more than hype.'
        primaryLink={{ label: 'Create an account', to: '/signup' }}
        secondaryLink={{ label: 'Contact us', to: '/contact' }}
      />

      <section className='py-12 md:py-16'>
        <Container>
          <div className='grid gap-6 lg:grid-cols-[0.95fr_1.05fr]'>
            <article className='rounded-[2rem] border border-base-300 bg-base-100 p-8 shadow-sm md:p-10'>
              <h2 className='text-2xl font-semibold md:text-3xl'>Who this is for</h2>
              <ul className='mt-5 grid gap-4 text-sm leading-8 text-base-content/72 md:text-base'>
                <li>Home cooks already serving friends, neighbors, or small office groups.</li>
                <li>Chefs who want repeat customers instead of one-time random orders.</li>
                <li>Kitchens that can maintain food quality, portions, and timing consistently.</li>
              </ul>
            </article>

            <article className='rounded-[2rem] border border-base-300 bg-base-200 p-8 md:p-10'>
              <h2 className='text-2xl font-semibold md:text-3xl'>What the path looks like</h2>
              <div className='mt-6 grid gap-5 md:grid-cols-3'>
                <div>
                  <p className='text-sm font-semibold text-primary'>1. Sign up</p>
                  <p className='mt-3 text-sm leading-7 text-base-content/70'>
                    Create your customer account with real name, photo, and contact details.
                  </p>
                </div>
                <div>
                  <p className='text-sm font-semibold text-primary'>2. Request chef access</p>
                  <p className='mt-3 text-sm leading-7 text-base-content/70'>
                    Share your interest so the admin side can review and approve trusted cooks.
                  </p>
                </div>
                <div>
                  <p className='text-sm font-semibold text-primary'>3. Add your meals</p>
                  <p className='mt-3 text-sm leading-7 text-base-content/70'>
                    Publish dishes with delivery timing, ingredients, pricing, and portions customers can understand easily.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </div>
  )
}

export const ContactPage = () => {
  return (
    <div className='pb-16'>
      <PageHeader
        eyebrow='Contact'
        title='Talk to us about orders, chef partnerships, or delivery concerns'
        description='We want the service to feel approachable. Whether you are ordering dinner for your home or joining as a local chef, there should always be a clear way to reach someone.'
        primaryLink={{ label: 'Browse meals', to: '/all-meals' }}
        secondaryLink={{ label: 'Become a chef', to: '/become-a-chef' }}
      />

      <section className='py-12 md:py-16'>
        <Container>
          <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <article className='rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>Email</p>
              <a href='mailto:hello@ghorermeal.com' className='mt-4 block text-lg font-semibold'>
                hello@ghorermeal.com
              </a>
              <p className='mt-3 text-sm leading-7 text-base-content/68'>
                Best for order help, account questions, and delivery follow-up.
              </p>
            </article>

            <article className='rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>Phone</p>
              <a href='tel:+8801712345678' className='mt-4 block text-lg font-semibold'>
                +880 1712-345678
              </a>
              <p className='mt-3 text-sm leading-7 text-base-content/68'>
                Good for urgent delivery concerns or quick customer support.
              </p>
            </article>

            <article className='rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>Hours</p>
              <p className='mt-4 text-lg font-semibold'>9:00 AM to 10:00 PM</p>
              <p className='mt-3 text-sm leading-7 text-base-content/68'>
                Support stays open every day so lunch and dinner issues can be handled quickly.
              </p>
            </article>

            <article className='rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>Location</p>
              <p className='mt-4 text-lg font-semibold'>Dhanmondi, Dhaka</p>
              <p className='mt-3 text-sm leading-7 text-base-content/68'>
                Our current focus is growing local delivery zones before expanding wider.
              </p>
            </article>
          </div>
        </Container>
      </section>
    </div>
  )
}
