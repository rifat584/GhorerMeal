import { NavLink } from 'react-router'

const MenuItem = ({ label, address, icon: Icon, onClick }) => {
  return (
    <NavLink
      to={address}
      end
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
          isActive
            ? 'bg-neutral-content/12 text-neutral-content'
            : 'text-neutral-content/70 hover:bg-neutral-content/10 hover:text-neutral-content'
        }`
      }
    >
      {Icon && <Icon className='h-5 w-5 shrink-0' />}
      <span>{label}</span>
    </NavLink>
  )
}

export default MenuItem
