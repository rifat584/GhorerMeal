import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork } from 'react-icons/md'
import { MdAddBusiness } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { PiChefHatFill } from "react-icons/pi";

import MenuItem from './MenuItem'
const ChefMenu = () => {
  return (
    <>
      <MenuItem
        icon={PiChefHatFill}
        label='Create Meal'
        address='create-meal'
      />
      <MenuItem icon={IoFastFoodSharp} label='My Meals' address='my-meals' />
      <MenuItem
        icon={MdAddBusiness}
        label='Order Requests'
        address='order-requests'
      />
    </>
  )
}

export default ChefMenu
