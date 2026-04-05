import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { FaUserCircle } from "react-icons/fa";

const AdminMenu = ({ onNavigate }) => {
  return (
    <>
      <MenuItem icon={FaUserCircle} label='Manage Users' address='manage-users' onClick={onNavigate} />
      <MenuItem icon={FaUserCog} label='Manage Request' address='manage-request' onClick={onNavigate} />
    </>
  )
}

export default AdminMenu
