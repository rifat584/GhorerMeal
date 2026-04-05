const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${
        smallHeight ? 'min-h-[16rem]' : 'min-h-[70vh]'
      } flex items-center justify-center px-4`}
      role='status'
      aria-live='polite'
    >
      <div className='flex flex-col items-center gap-5 rounded-[2rem] border border-base-300 bg-base-100/95 px-8 py-7 text-center shadow-sm'>
        <div className='relative h-16 w-16'>
          <span className='absolute inset-0 rounded-full border-4 border-base-300/70' />
          <span className='absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary border-r-secondary' />
          <span className='absolute inset-[0.85rem] rounded-full bg-base-200' />
        </div>

        <div className='space-y-2'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-base-content/45'>
            Loading
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
