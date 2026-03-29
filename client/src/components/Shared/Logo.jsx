import { Link } from 'react-router'

const Logo = ({
  hideText = false,
  logoSize = 'h-12 w-12 sm:h-14 sm:w-14',
  textSize = 'h-7 sm:h-8',
  className = '',
}) => {
  return (
    <Link
      to='/'
      aria-label='Ghorer Meal home'
      className={`flex min-w-0 items-center gap-1 ${className}`.trim()}
    >
      <img
        src='/ghorermeal.png'
        alt='Ghorer Meal logo'
        className={`${logoSize} shrink-0 rounded-2xl object-contain`}
      />
      {!hideText && (
        <img
          src='/ghorermeal-text.png'
          alt='Ghorer Meal'
          className={`${textSize} w-auto object-contain`}
        />
      )}
    </Link>
  )
}

export default Logo
