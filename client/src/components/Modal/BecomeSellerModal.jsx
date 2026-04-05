import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'

const BecomeSellerModal = ({ closeModal, isOpen }) => {
  const { user } = useAuth()
  const [isSendingRequest, setIsSendingRequest] = useState(false)

  const handleChefRole = async () => {
    if (!user?.email) {
      toast.error('Could not find your account email')
      return
    }

    const roleData = {
      userName: user?.displayName,
      userEmail: user.email,
      requestType: 'chef',
      requestStatus: 'pending',
      requestTime: new Date().toISOString(),
    }

    setIsSendingRequest(true)

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/roles`, roleData)
      toast.success('Chef request sent for review')
      closeModal()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not send request')
    } finally {
      setIsSendingRequest(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-50 focus:outline-none'
      onClose={isSendingRequest ? () => {} : closeModal}
    >
      <div className='fixed inset-0 bg-base-content/45 backdrop-blur-sm' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel
          transition
          className='w-full max-w-lg rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 sm:p-7'
        >
          <div className='space-y-6'>
            <header className='space-y-3'>
              <DialogTitle className='text-2xl font-semibold tracking-tight text-base-content sm:text-[2rem]'>
                Become a chef on Ghorer Meal
              </DialogTitle>
              <p className='max-w-2xl text-sm leading-7 text-base-content/70 sm:text-base'>
                Send a chef access request when you are ready to publish meals and
                manage incoming orders from your dashboard.
              </p>
            </header>

            <div className='rounded-[1.5rem] border border-base-300 bg-base-200/70 p-4 sm:p-5'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                    Request
                  </p>
                  <p className='mt-2 text-sm font-medium text-base-content'>
                    Chef access
                  </p>
                </div>

                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                    Status
                  </p>
                  <p className='mt-2 text-sm font-medium text-base-content'>
                    Pending review
                  </p>
                </div>

                <div className='sm:col-span-2'>
                  <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                    Account
                  </p>
                  <p className='mt-2 text-sm leading-7 text-base-content/75'>
                    {user?.email || 'Signed-in account'}
                  </p>
                </div>
              </div>
            </div>

            <p className='text-sm leading-7 text-base-content/68'>
              Once your request is approved, your dashboard will unlock chef tools
              for adding meals, reviewing order requests, and managing your menu.
            </p>

            <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
              <button
                type='button'
                onClick={closeModal}
                disabled={isSendingRequest}
                className='btn rounded-full border border-base-300 bg-base-100 px-6 text-base-content hover:bg-base-200 disabled:border-base-300 disabled:bg-base-100 disabled:text-base-content/50'
              >
                Cancel
              </button>

              <button
                type='button'
                onClick={handleChefRole}
                disabled={isSendingRequest}
                className='btn btn-primary rounded-full px-6'
              >
                {isSendingRequest ? 'Sending request...' : 'Send request'}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default BecomeSellerModal
