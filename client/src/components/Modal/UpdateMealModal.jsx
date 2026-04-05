import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import UpdateMealForm from '../Form/UpdateMealForm'

const UpdateMealModal = ({ setIsEditModalOpen, isOpen, meal }) => {
  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none '
      onClose={() => setIsEditModalOpen(false)}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-2xl rounded-[1.75rem] border border-base-300/70 bg-base-100 p-6 shadow-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0'
          >
            <div className='flex justify-end'>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content/70 transition hover:text-error'
              >
                X
              </button>
            </div>
            <DialogTitle
              as='h3'
              className='text-center text-2xl font-semibold tracking-tight text-base-content'
            >
              Update meal
            </DialogTitle>
            <p className='mt-2 text-center text-sm leading-7 text-base-content/65'>
              Change the saved meal details without leaving the table view.
            </p>
            <div className='mt-6 w-full'>
              <UpdateMealForm meal={meal} closeModal={() => setIsEditModalOpen(false)} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default UpdateMealModal
