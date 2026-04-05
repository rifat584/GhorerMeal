import Container from '../../components/Shared/Container'

const About = () => {
  return (
    <div className='pb-16 pt-6 md:pb-20 md:pt-8'>
      <Container>
        <article className='mx-auto max-w-4xl'>
          <h1 className='mt-4 text-3xl font-semibold tracking-tight text-base-content md:text-5xl'>
            A food platform built around local trust instead of endless choice
          </h1>

          <div className='mt-8 space-y-5 text-sm leading-8 text-base-content/72 md:text-base'>
            <p>
              Ghorer Meal is built for people who want ordering to feel more
              dependable. Most busy homes are not trying to discover a completely
              different place every night. They want a few reliable cooks, enough
              information to order confidently, and meals that feel worth repeating
              once the first order goes well.
            </p>
            <p>
              That changes what the platform needs to prioritize. Chef identity has
              to be visible. Delivery timing needs to feel realistic. Reviews,
              favorites, and repeat ordering should matter more than flashy
              promotion because trust is what actually keeps someone coming back.
            </p>
            <p>
              The website should make strong local cooks easier to understand and
              easier to trust. When that works, customers spend less time guessing,
              chefs spend less time answering the same basic questions, and the
              whole service feels more like a dependable neighborhood food network
              than a noisy marketplace.
            </p>
          </div>
        </article>

        <section className='mx-auto mt-14 max-w-4xl border-t border-base-300/80 pt-10'>
          <h2 className='text-2xl font-semibold tracking-tight text-base-content md:text-3xl'>
            What the platform is trying to solve
          </h2>

          <div className='mt-6 space-y-5 text-sm leading-8 text-base-content/72 md:text-base'>
            <p>
              People should not have to work this hard to understand whether a meal
              fits their evening. A good product should reduce the small frictions
              that make food ordering feel uncertain: unclear kitchen identity,
              vague delivery timing, weak meal descriptions, and too little support
              for repeat use.
            </p>
            <p>
              Ghorer Meal is moving toward a calmer and more practical experience.
              Instead of trying to look like a marketplace full of noise, the site
              should feel like a trusted local food network where the best cooks
              earn their place by being consistent, visible, and easy to understand.
            </p>
          </div>
        </section>

        <section className='mx-auto mt-14 max-w-4xl border-t border-base-300/80 pt-10'>
          <h2 className='text-2xl font-semibold tracking-tight text-base-content md:text-3xl'>
            What a better experience looks like
          </h2>

          <div className='mt-6 space-y-4 text-sm leading-8 text-base-content/72 md:text-base'>
            <p>
              Ordering should feel useful on a normal Tuesday, not just interesting
              on the first visit. Lunch needs to arrive on time. Dinner needs to
              feel worth the price. Family meals need enough clarity around
              portion, timing, and flavor that ordering again feels easy.
            </p>
            <p>
              If the platform works well, customers spend less time comparing random
              options and more time returning to cooks they already trust. At the
              same time, chefs spend less effort explaining basic details one by one
              because the website is doing more of that work up front.
            </p>
            <ul className='space-y-3 pl-5'>
              <li className='list-disc'>Clear chef identity instead of anonymous meal listings.</li>
              <li className='list-disc'>Realistic delivery windows instead of vague promises.</li>
              <li className='list-disc'>Reviews and favorites that make repeat ordering easier.</li>
            </ul>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default About
