
import { MdReviews } from "react-icons/md";
import { BsCalendarHeartFill } from "react-icons/bs";
import { PiListNumbersFill } from "react-icons/pi";
import { IoMdPersonAdd } from "react-icons/io";

import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeSellerModal from '../../../Modal/BecomeSellerModal'
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <MenuItem icon={PiListNumbersFill} label='My Orders' address='my-orders' />
      <MenuItem icon={MdReviews} label='My Review' address='my-review' />
      <MenuItem icon={BsCalendarHeartFill} label='Favorite Meal' address='favorite-meal' />

      <div
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        <IoMdPersonAdd className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Seller</span>
      </div>

      <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} />
    </>
  )
}

export default UserMenu
