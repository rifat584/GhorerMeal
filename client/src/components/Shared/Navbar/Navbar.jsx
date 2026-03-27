import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import {
  DARK_THEME,
  getTheme,
  setTheme,
  toggleTheme,
} from '../../../utilitis/theme'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setCurrentTheme] = useState(getTheme)

  const handleThemeToggle = () => {
    const nextTheme = toggleTheme(theme)
    setTheme(nextTheme)
    setCurrentTheme(nextTheme)
  }
  const isDarkTheme = theme === DARK_THEME

  return (
    <div className='fixed z-10 w-full bg-base-100/90 text-base-content shadow-sm backdrop-blur transition-colors'>
      <div className='py-4 '>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            
            <Link to='/'>
              {/* <img src={logo} alt='logo' width='100' height='100' /> */}
              Ghorer Meal
            </Link>
            
            <Link to={"all-meals"}>Meals</Link>
            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
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
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='flex cursor-pointer flex-row items-center gap-3 rounded-full border border-base-300 bg-base-100 p-4 transition hover:shadow-md md:px-2 md:py-1'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl border border-base-300 bg-base-100 text-sm text-base-content shadow-md md:w-[10vw]'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block px-4 py-3 font-semibold transition hover:bg-base-200 md:hidden'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to='/dashboard'
                          className='px-4 py-3 font-semibold transition hover:bg-base-200'
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className='cursor-pointer px-4 py-3 font-semibold transition hover:bg-base-200'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 font-semibold transition hover:bg-base-200'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 font-semibold transition hover:bg-base-200'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
