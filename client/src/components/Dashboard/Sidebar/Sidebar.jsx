import { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { IoStatsChart, IoClose, IoPersonCircleOutline } from 'react-icons/io5'

import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import UserMenu from './Menu/UserMenu'
import useRole from '../../../hooks/useRole'
import ChefMenu from './Menu/ChefMenu'
import Logo from '../../Shared/Logo'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const { role } = useRole()

  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <>
      <div className='sticky top-0 z-30 flex items-center justify-between border-b border-base-300/70 bg-base-100/95 px-4 py-3 backdrop-blur lg:hidden'>
        <Logo
          logoSize='h-10 w-10'
          textSize='h-5'
          className='max-w-[11rem] overflow-hidden'
        />

        <button
          onClick={handleToggle}
          className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content transition hover:border-primary/30 hover:text-primary'
          aria-label='Toggle dashboard navigation'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {isActive && (
        <button
          type='button'
          aria-label='Close dashboard navigation'
          onClick={handleToggle}
          className='fixed inset-0 z-30 bg-neutral/45 lg:hidden'
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 flex w-[18.5rem] flex-col border-r border-neutral-content/10 bg-neutral px-4 py-4 text-neutral-content transition duration-200 ease-in-out ${
          isActive ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className='flex flex-col h-full'>
          <div className='flex items-center justify-between rounded-[1.5rem] border border-neutral-content/10 bg-neutral-content/5 px-3 py-3'>
            <Logo logoSize='h-11 w-11' textSize='h-6' />

            <button
              type='button'
              onClick={handleToggle}
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-content/10 text-neutral-content/70 transition hover:bg-neutral-content/10 lg:hidden'
              aria-label='Close dashboard navigation'
            >
              <IoClose className='h-5 w-5' />
            </button>
          </div>

          <div className='mt-6 flex flex-1 flex-col justify-between'>
            <div className='space-y-5'>
              <div>
                <nav className='mt-3 space-y-1'>
                  {role === 'admin' && (
                    <MenuItem
                      icon={IoStatsChart}
                      label='Statistics'
                      address='/dashboard/stat'
                      onClick={() => setActive(false)}
                    />
                  )}

                  {role === 'user' && <UserMenu onNavigate={() => setActive(false)} />}
                  {role === 'chef' && <ChefMenu onNavigate={() => setActive(false)} />}
                  {role === 'admin' && <AdminMenu onNavigate={() => setActive(false)} />}
                </nav>
              </div>
            </div>

            <div className='mt-6 border-t border-neutral-content/10 pt-4'>
            
              <div className='mt-3 space-y-1'>
                <MenuItem
                  icon={IoPersonCircleOutline}
                  label='Profile'
                  address='/dashboard/profile'
                  onClick={() => setActive(false)}
                />
                <button
                  onClick={logOut}
                  className='flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-neutral-content/70 transition hover:bg-neutral-content/10 hover:text-neutral-content'
                >
                  <GrLogout className='h-5 w-5' />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
