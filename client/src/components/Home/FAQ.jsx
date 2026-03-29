import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2'
import Container from '../Shared/Container'

const faqItems = [
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

const FAQ = () => {
  return (
    <section className='bg-base-200/35 py-18'>
      <Container>
        <div className='mx-auto max-w-4xl'>
          <header className='mx-auto max-w-3xl text-center'>
            <h2 className='text-3xl font-semibold text-base-content md:text-5xl'>
              Frequently asked questions before you order
            </h2>
            <p className='mt-4 text-sm leading-7 text-base-content/72 md:text-base'>
              People usually want a few practical answers before trusting a new
              meal platform. These are some of the questions that come up most
              often before the first order.
            </p>
          </header>

          <div className='mt-10 grid gap-4'>
            {faqItems.map((item) => (
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
        </div>
      </Container>
    </section>
  )
}

export default FAQ
