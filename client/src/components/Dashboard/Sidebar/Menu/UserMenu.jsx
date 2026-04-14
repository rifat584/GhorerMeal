import { BsCalendarHeartFill, BsChatDotsFill } from 'react-icons/bs'
import { IoMdPersonAdd } from 'react-icons/io'
import { MdReviews } from 'react-icons/md'
import { PiListNumbersFill } from 'react-icons/pi'

import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeSellerModal from '../../../Modal/BecomeSellerModal'

const UserMenu = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <MenuItem
        icon={PiListNumbersFill}
        label='My Orders'
        address='my-orders'
        onClick={onNavigate}
      />
      <MenuItem
        icon={BsChatDotsFill}
        label='Messages'
        address='messages'
        onClick={onNavigate}
      />
      <MenuItem
        icon={MdReviews}
        label='My Review'
        address='my-review'
        onClick={onNavigate}
      />
      <MenuItem
        icon={BsCalendarHeartFill}
        label='Favorite Meal'
        address='favorite-meal'
        onClick={onNavigate}
      />

      <div
        onClick={() => setIsOpen(true)}
        className='mt-1 flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-neutral-content/70 transition hover:bg-neutral-content/10 hover:text-neutral-content'
      >
        <IoMdPersonAdd className='w-5 h-5' />

        <span>Become a Seller</span>
      </div>

      <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} />
    </>
  )
}

export default UserMenu
