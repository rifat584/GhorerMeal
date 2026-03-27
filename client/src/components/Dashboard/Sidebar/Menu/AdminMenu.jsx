import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { FaUserCircle } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCircle} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaUserCog} label='Manage Request' address='manage-request' />
    </>
  )
}

export default AdminMenu
