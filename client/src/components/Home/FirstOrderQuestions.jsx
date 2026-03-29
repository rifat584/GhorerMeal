import {
  HiOutlineQuestionMarkCircle,
  HiOutlineShieldCheck,
} from 'react-icons/hi2'
import Container from '../Shared/Container'

const questionItems = [
  {
    question: 'Can I order only when I need help, or does this have to become a fixed habit?',
    answer:
      'Most customers start exactly when they need relief. They may only order once or twice a week at first, and then return more often after they find a chef and a few meals they genuinely trust.',
  },
  {
    question: 'How do I know whether a meal will actually suit my home?',
    answer:
      'The best listings make that easier by showing who cooked it, what comes with the meal, how long it takes to arrive, and whether previous customers felt the dish matched its description.',
  },
  {
    question: 'Why does a local chef platform feel different from a generic delivery app?',
    answer:
      'Because trust carries more weight here. People want to understand the cook behind the meal, not just choose the fastest option on a long list of restaurants.',
  },
  {
    question: 'What makes someone come back after the first order?',
    answer:
      'Usually it is a mix of taste, timing, and consistency. If the food arrives when promised and feels worth repeating, people remember it and order again with more confidence.',
  },
]

const FirstOrderQuestions = () => {
  return (
    <section className='py-18'>
      <Container>
        <div className='grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12'>
          <div className='overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 p-3 shadow-sm sm:p-4'>
            <img
              src='/home-chef.jpg'
              alt='A chef preparing food at a home kitchen counter'
              className='h-80 w-full rounded-[1.5rem] object-cover md:h-[520px]'
            />
          </div>

          <div>
            <header className='max-w-3xl'>
              <h2 className='text-3xl font-semibold text-base-content md:text-4xl'>
                Questions people ask before they trust a new meal platform
              </h2>
              <p className='mt-4 text-sm leading-7 text-base-content/72 md:text-base'>
                Customers usually have a few honest questions before the first order. A
                homepage feels more useful when those answers are close at hand.
              </p>
            </header>

            <div className='mt-8 grid gap-4'>
              {questionItems.map(item => (
                <details
                  key={item.question}
                  className='rounded-[1.75rem] border border-base-300 bg-base-100 p-5 shadow-sm'
                >
                  <summary className='flex cursor-pointer list-none items-start gap-3 text-lg font-semibold text-base-content'>
                    <HiOutlineQuestionMarkCircle className='mt-1 shrink-0 text-2xl text-primary' />
                    <span>{item.question}</span>
                  </summary>
                  <p className='mt-4 pl-9 text-sm leading-8 text-base-content/70 md:text-base'>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className='mt-8 rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-sm'>
              <div className='flex items-start gap-3'>
                <HiOutlineShieldCheck className='mt-1 text-2xl text-accent' />
                <p className='text-sm leading-8 text-base-content/70 md:text-base'>
                  Research from platforms like Shef, CookUnity, and Home Chef points to
                  the same pattern: trust grows faster when the service feels clear and
                  practical before it tries to feel impressive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FirstOrderQuestions
