import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRef } from 'react'
import toast from 'react-hot-toast'

const UpdateUserRoleModal = ({ isOpen, closeModal, role, email }) => {
  const roleSelectRef = useRef(null)
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async selectedRole => {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/${email}?role=${selectedRole}`
      )

      return selectedRole
    },
    onSuccess: selectedRole => {
      toast.success(`${email} has been set to ${selectedRole}`)
      queryClient.invalidateQueries({ queryKey: ['users'] })
      closeModal()
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Could not update the role')
    },
  })

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
                Update user role
              </DialogTitle>
              <p className='text-sm leading-7 text-base-content/70'>
                Choose the dashboard access this account should have next.
              </p>
            </header>

            <div className='grid gap-4 rounded-[1.5rem] border border-base-300 bg-base-200/70 p-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                  Account
                </p>
                <p className='mt-2 text-sm font-medium text-base-content'>{email}</p>
              </div>

              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'>
                  Current role
                </p>
                <p className='mt-2 text-sm font-medium capitalize text-base-content'>
                  {role}
                </p>
              </div>
            </div>

            <div className='space-y-2 text-sm'>
              <label className='font-medium text-base-content/75'>Select role</label>
              <select
                key={`${email}-${role}-${isOpen ? 'open' : 'closed'}`}
                defaultValue={role}
                ref={roleSelectRef}
                className='w-full rounded-2xl border border-base-300 bg-base-100 px-4 py-3 text-sm text-base-content outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10'
                name='role'
              >
                <option value='user'>User</option>
                <option value='chef'>Chef</option>
                <option value='admin'>Admin</option>
              </select>
            </div>

            <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
              <button
                type='button'
                disabled={isPending}
                className='btn rounded-full border border-base-300 bg-base-100 px-6 text-base-content hover:bg-base-200 disabled:border-base-300 disabled:bg-base-100 disabled:text-base-content/50'
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={() => mutate(roleSelectRef.current?.value || role)}
                disabled={isPending}
                className='btn btn-primary rounded-full px-6'
              >
                {isPending ? 'Saving...' : 'Save role'}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default UpdateUserRoleModal
