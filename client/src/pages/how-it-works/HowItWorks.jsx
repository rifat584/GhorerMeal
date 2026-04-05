import Container from '../../components/Shared/Container'

const labelClassName =
  'text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'

const HowItWorks = () => {
  const steps = [
    {
      title: 'Browse meals that match your day',
      description:
        'Start with meals, ratings, prices, and delivery windows that make sense for workdays, family dinners, or quick solo orders.',
      details:
        'Instead of browsing through noisy menus, the customer should be able to compare price, delivery timing, ratings, and meal type quickly enough to make a decision during a lunch break or on the way home.',
    },
    {
      title: 'Choose a trusted local kitchen',
      description:
        'Every listing helps you understand who prepared the dish, what kind of food they are known for, and how quickly it can arrive.',
      details:
        'That trust comes from seeing a real chef identity, practical dish details, and enough context to understand what kind of kitchen is behind the meal before placing an order.',
    },
    {
      title: 'Order with confidence and come back easily',
      description:
        'Reviews, favorite meals, and consistent menu structure make it easier to reorder the dishes that already worked for you.',
      details:
        'Once a meal works, the platform should make it easy to come back to it. Reviews, favorites, and a clearer ordering history all help reduce friction the next time someone needs a reliable meal.',
    },
  ]

  return (
    <div className='pb-16 pt-6 md:pb-20 md:pt-8'>
      <Container>
        <section className='rounded-[2rem] border border-base-300 bg-base-200/55 p-6 md:p-8'>
          <div className='grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start'>
            <div>
              <p className={labelClassName}>How it works</p>
              <h1 className='mt-4 text-3xl font-semibold tracking-tight text-base-content md:text-5xl'>
                From browsing to delivery without unnecessary steps
              </h1>
              <p className='mt-6 text-sm leading-8 text-base-content/72 md:text-base'>
                The experience should feel simple for both sides. Customers need to
                understand what they are ordering and when it can arrive. Chefs need
                a clear path to publish meals, respond to orders, and keep the flow
                manageable without extra complexity.
              </p>
            </div>

            <ol className='space-y-6'>
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className='grid gap-4 border-t border-base-300/80 pt-6 first:border-none first:pt-0 md:grid-cols-[4.25rem_1fr]'
                >
                  <div className='flex h-14 w-14 items-center justify-center rounded-full border border-base-300 bg-base-100 text-lg font-semibold text-base-content'>
                    {index + 1}
                  </div>

                  <div>
                    <h2 className='text-2xl font-semibold text-base-content'>
                      {step.title}
                    </h2>
                    <p className='mt-4 text-sm leading-8 text-base-content/72 md:text-base'>
                      {step.description}
                    </p>
                    <p className='mt-4 text-sm leading-8 text-base-content/72 md:text-base'>
                      {step.details}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className='mt-10 rounded-[2rem] border border-base-300 bg-base-200/55 p-6 md:mt-12 md:p-8'>
          <div className='grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start'>
            <div>
              <p className={labelClassName}>What keeps the experience trustworthy</p>
              <h2 className='mt-4 text-2xl font-semibold tracking-tight text-base-content md:text-3xl'>
                Clear expectations matter more than extra features
              </h2>
              <p className='mt-5 text-sm leading-8 text-base-content/72 md:text-base'>
                A service like this becomes believable when the basics stay clear.
                Delivery timing should be realistic. Customers should know when
                payment happens. Reviews should help new people judge consistency.
                Chefs should be visible enough that meals feel connected to a real
                kitchen instead of a nameless listing.
              </p>
            </div>

            <div className='space-y-5'>
              <div className='border-t border-base-300/80 pt-5 first:border-none first:pt-0'>
                <h3 className='text-lg font-semibold text-base-content'>
                  Transparent delivery windows
                </h3>
                <p className='mt-3 text-sm leading-7 text-base-content/72'>
                  Customers should be able to decide based on timing that feels
                  practical, not optimistic. That helps set better expectations
                  before the order is placed.
                </p>
              </div>

              <div className='border-t border-base-300/80 pt-5'>
                <h3 className='text-lg font-semibold text-base-content'>
                  Payment only after chef acceptance
                </h3>
                <p className='mt-3 text-sm leading-7 text-base-content/72'>
                  The flow works better when the customer first places an order,
                  the chef confirms it, and payment only starts once the kitchen is
                  ready to move forward.
                </p>
              </div>

              <div className='border-t border-base-300/80 pt-5'>
                <h3 className='text-lg font-semibold text-base-content'>
                  Reviews and favorites build repeat trust
                </h3>
                <p className='mt-3 text-sm leading-7 text-base-content/72'>
                  Good meals should naturally gather reviews, favorites, and repeat
                  orders. Those signals help new customers choose with more
                  confidence and help strong chefs stand out for the right reasons.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default HowItWorks
