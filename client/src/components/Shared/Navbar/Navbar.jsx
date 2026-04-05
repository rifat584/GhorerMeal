import Container from '../Container'
import { HiBars3, HiOutlineMoon, HiOutlineSun, HiXMark } from 'react-icons/hi2'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import avatarImg from '../../../assets/images/placeholder.jpg'
import {
  DARK_THEME,
  getTheme,
  setTheme,
  toggleTheme,
} from '../../../utilitis/theme'
import Logo from '../Logo'

const publicLinks = [
  { label: 'Home', to: '/' },
  { label: 'Meals', to: '/all-meals' },
  { label: 'Become a Chef', to: '/become-a-chef' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const mobileButtonClassName =
  'flex h-11 w-11 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content transition hover:border-primary/40 hover:bg-base-200'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const { role, isRoleLoading } = useRole()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setCurrentTheme] = useState(getTheme)
  const showBecomeChefLink =
    !user || (!isRoleLoading && role !== 'chef' && role !== 'admin')
  const visibleLinks = showBecomeChefLink
    ? publicLinks
    : publicLinks.filter(link => link.to !== '/become-a-chef')

  const handleThemeToggle = () => {
    const nextTheme = toggleTheme(theme)
    setTheme(nextTheme)
    setCurrentTheme(nextTheme)
  }
  const isDarkTheme = theme === DARK_THEME

  const handleLogOut = async () => {
    await logOut()
    setIsMenuOpen(false)
  }

  const closeMenu = () => setIsMenuOpen(false)

  const navLinkClassName = isActive =>
    `inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-primary text-primary-content shadow-sm'
        : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
    }`

  return (
    <header className='sticky top-0 z-30 border-b border-base-300/70 bg-base-100/95 backdrop-blur transition-colors'>
      <Container>
        <div className='flex items-center justify-between gap-3 py-2 sm:gap-4 sm:py-2'>
          <div className='min-w-0 flex-1 xl:flex-none'>
            <Logo
              className='w-fit shrink-0'
              logoSize='h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12'
              textSize='h-5 sm:h-6 lg:h-7'
            />
          </div>

          <nav className='hidden lg:flex lg:items-center lg:gap-1'>
            {visibleLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => navLinkClassName(isActive)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className='hidden shrink-0 items-center gap-3 xl:flex'>
            <button
              type='button'
              onClick={handleThemeToggle}
              className='btn btn-ghost btn-circle border border-base-300 bg-base-100 text-base-content'
              aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
            >
              {isDarkTheme ? (
                <HiOutlineSun className='h-5 w-5' />
              ) : (
                <HiOutlineMoon className='h-5 w-5' />
              )}
            </button>

            {user ? (
              <>
                <Link
                  to='/dashboard/profile'
                  className='flex items-center gap-3 rounded-full border border-base-300 bg-base-100 px-3 py-2 transition hover:border-primary/40 hover:shadow-sm'
                >
                  <img
                    className='h-10 w-10 rounded-full object-cover'
                    referrerPolicy='no-referrer'
                    src={user.photoURL || avatarImg}
                    alt={user.displayName || 'User avatar'}
                  />
                  <div className='text-left'>
                    <p className='text-sm font-semibold'>
                      {user.displayName || 'My account'}
                    </p>
                    <p className='text-xs text-base-content/60'>Open dashboard</p>
                  </div>
                </Link>
                <button
                  type='button'
                  onClick={handleLogOut}
                  className='btn btn-ghost rounded-full px-5 whitespace-nowrap'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className='btn btn-ghost rounded-full px-5 whitespace-nowrap'>
                  Log in
                </Link>
                <Link
                  to='/signup'
                  className='btn btn-primary rounded-full px-5 whitespace-nowrap'
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          <div className='flex shrink-0 items-center gap-2 xl:hidden'>
            <button
              type='button'
              onClick={handleThemeToggle}
              className={mobileButtonClassName}
              aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
            >
              {isDarkTheme ? (
                <HiOutlineSun className='h-5 w-5' />
              ) : (
                <HiOutlineMoon className='h-5 w-5' />
              )}
            </button>
            <button
              type='button'
              onClick={() => setIsMenuOpen(previousValue => !previousValue)}
              className={mobileButtonClassName}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <HiXMark className='h-6 w-6' />
              ) : (
                <HiBars3 className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className='border-t border-base-300/70 py-4 xl:hidden'>
            <nav className='grid gap-2'>
              {visibleLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `${navLinkClassName(isActive)} w-full justify-start rounded-2xl px-5 py-3`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className='mt-4 grid gap-3 border-t border-base-300/70 pt-4'>
              {user ? (
                <>
                  <Link
                    to='/dashboard/profile'
                    onClick={closeMenu}
                    className='flex items-center gap-3 rounded-3xl border border-base-300 bg-base-100 px-4 py-3'
                  >
                    <img
                      className='h-12 w-12 rounded-full object-cover'
                      referrerPolicy='no-referrer'
                      src={user.photoURL || avatarImg}
                      alt={user.displayName || 'User avatar'}
                    />
                    <div>
                      <p className='font-semibold'>{user.displayName || 'My account'}</p>
                      <p className='text-sm text-base-content/60'>View dashboard</p>
                    </div>
                  </Link>
                  <button
                    type='button'
                    onClick={handleLogOut}
                    className='btn btn-primary w-full rounded-full'
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    onClick={closeMenu}
                    className='btn btn-ghost w-full rounded-full'
                  >
                    Log in
                  </Link>
                  <Link
                    to='/signup'
                    onClick={closeMenu}
                    className='btn btn-primary w-full rounded-full'
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Navbar
