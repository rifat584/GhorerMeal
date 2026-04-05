import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRef } from 'react'
import toast from 'react-hot-toast'

const UpdateUserRoleModal = ({ isOpen, closeModal, role,email }) => {
  const roleSelectRef = useRef(null)
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async selectedRole => {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/${email}?role=${selectedRole}`
      )

      return selectedRole
    },
    onSuccess: selectedRole =>{
      toast.success(`${email} has been set to ${selectedRole}`)
      queryClient.invalidateQueries({queryKey: ['users']})
      closeModal()
    },
    onError: (error)=>{
      toast.error(error.response?.data?.message || 'Could not update the role')
    }
  })

  return (
    <>
      <Dialog
        open={isOpen}
        as='div'
        className='relative z-10 focus:outline-none'
        onClose={closeModal}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl'
            >
              <DialogTitle
                as='h3'
                className='text-base/7 font-medium text-black'
              >
                Update User Role
              </DialogTitle>
              <form>
                <div>
                  <select
                    key={`${email}-${role}-${isOpen ? 'open' : 'closed'}`}
                    defaultValue={role}
                    ref={roleSelectRef}
                    className='w-full my-3 border border-gray-200 rounded-xl px-2 py-3'
                    name='role'
                    id=''
                  >
                    <option value='user'>User</option>
                    <option value='chef'>Chef</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
                <div className='flex mt-2 justify-around'>
                  <button
                    type='button'
                    onClick={() => mutate(roleSelectRef.current?.value || role)}
                    disabled={isPending}
                    className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                  >
                    {isPending ? 'Updating...' : 'Update'}
                  </button>
                  <button
                    type='button'
                    disabled={isPending}
                    className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
export default UpdateUserRoleModal
