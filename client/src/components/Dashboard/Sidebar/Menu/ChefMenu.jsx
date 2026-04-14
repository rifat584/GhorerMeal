import { BsChatDotsFill } from 'react-icons/bs'
import { IoFastFoodSharp } from 'react-icons/io5'
import { MdAddBusiness } from 'react-icons/md'
import { PiChefHatFill } from 'react-icons/pi'

import MenuItem from './MenuItem'

const ChefMenu = ({ onNavigate }) => {
  return (
    <>
      <MenuItem
        icon={PiChefHatFill}
        label='Create Meal'
        address='create-meal'
        onClick={onNavigate}
      />
      <MenuItem
        icon={IoFastFoodSharp}
        label='My Meals'
        address='my-meals'
        onClick={onNavigate}
      />
      <MenuItem
        icon={BsChatDotsFill}
        label='Messages'
        address='messages'
        onClick={onNavigate}
      />
      <MenuItem
        icon={MdAddBusiness}
        label='Order Requests'
        address='order-requests'
        onClick={onNavigate}
      />
    </>
  )
}

export default ChefMenu
