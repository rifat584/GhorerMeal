import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const DeleteModal = ({ closeModal, isOpen, onConfirm }) => {
  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-50 focus:outline-none'
      onClose={closeModal}
    >
      <div className='fixed inset-0 bg-base-content/45 backdrop-blur-sm' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel
          transition
          className='w-full max-w-md rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 sm:p-7'
        >
          <div className='space-y-6'>
            <header className='space-y-3'>
              <DialogTitle className='text-2xl font-semibold tracking-tight text-base-content'>
                Delete this meal?
              </DialogTitle>
              <p className='text-sm leading-7 text-base-content/70'>
                This will remove the meal from your dashboard and customers will
                no longer see it.
              </p>
            </header>

            <div className='rounded-[1.5rem] border border-base-300 bg-base-200/70 p-4 text-sm leading-7 text-base-content/70'>
              This action cannot be undone after the meal is deleted.
            </div>

            <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
              <button
                type='button'
                className='btn rounded-full border border-base-300 bg-base-100 px-6 text-base-content hover:bg-base-200'
                onClick={closeModal}
              >
                Keep meal
              </button>
              <button
                type='button'
                className='btn rounded-full border border-error/20 bg-error/12 px-6 text-error hover:bg-error/18'
                onClick={onConfirm}
              >
                Delete meal
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default DeleteModal
