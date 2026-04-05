import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import UpdateMealForm from '../Form/UpdateMealForm'

const UpdateMealModal = ({ setIsEditModalOpen, isOpen, meal }) => {
  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-50 focus:outline-none'
      onClose={() => setIsEditModalOpen(false)}
    >
      <div className='fixed inset-0 bg-base-content/45 backdrop-blur-sm' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel
          transition
          className='w-full max-w-3xl max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 sm:p-7'
        >
          <div className='space-y-6'>
            <header className='space-y-3'>
              <DialogTitle
                as='h3'
                className='text-2xl font-semibold tracking-tight text-base-content'
              >
                Update meal
              </DialogTitle>
              <p className='text-sm leading-7 text-base-content/70'>
                Refresh the details for this listing and save the update from here.
              </p>
            </header>

            <div className='w-full'>
              <UpdateMealForm meal={meal} closeModal={() => setIsEditModalOpen(false)} />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default UpdateMealModal
