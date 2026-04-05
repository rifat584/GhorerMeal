import { Link } from 'react-router'

const joinClasses = (...classes) => classes.filter(Boolean).join(' ')

const metricDotByTone = {
  neutral: 'bg-base-content/35',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-error',
}

const badgeByTone = {
  neutral: 'border-base-300 bg-base-200/80 text-base-content/70',
  primary: 'border-primary/20 bg-primary/12 text-primary',
  success: 'border-emerald-500/20 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300',
  warning: 'border-amber-500/20 bg-amber-500/12 text-amber-700 dark:text-amber-300',
  danger: 'border-rose-500/20 bg-rose-500/12 text-rose-700 dark:text-rose-300',
}

export const dashboardTableHeaderClassName =
  'px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45'

export const dashboardTableCellClassName =
  'px-4 py-4 align-top text-sm text-base-content/75'

export const dashboardActionButtonClassName =
  'inline-flex items-center justify-center rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-content transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40'

export const dashboardSecondaryButtonClassName =
  'inline-flex items-center justify-center rounded-full border border-base-300 bg-base-100 px-3.5 py-2 text-xs font-semibold text-base-content/80 transition hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40'

export const dashboardDangerButtonClassName =
  'inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/12 dark:text-rose-300 disabled:cursor-not-allowed disabled:opacity-40'

export const dashboardGhostButtonClassName =
  'inline-flex items-center justify-center rounded-full px-3.5 py-2 text-xs font-semibold text-base-content/65 transition hover:bg-base-200 hover:text-base-content disabled:cursor-not-allowed disabled:opacity-40'

export const DashboardPage = ({
  title,
  description,
  action,
  metrics = [],
  children,
}) => {
  return (
    <section className='space-y-6'>
      <header className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-semibold tracking-tight text-base-content md:text-4xl'>
            {title}
          </h1>
          {description && (
            <p className='max-w-3xl text-sm leading-7 text-base-content/70 md:text-base'>
              {description}
            </p>
          )}
        </div>
        {action && <div className='shrink-0'>{action}</div>}
      </header>

      {metrics.length > 0 && (
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
          {metrics.map(metric => (
            <article
              key={metric.label}
              className='rounded-3xl text-center border border-base-300/70 bg-base-100 p-5 shadow-sm'
            >
              <div className='flex justify-center items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45'>
                <span
                  className={joinClasses(
                    'h-2.5 w-2.5 rounded-full',
                    metricDotByTone[metric.tone] || metricDotByTone.neutral
                  )}
                />
                {metric.label}
              </div>
              <p className='mt-4 text-5xl font-semibold tracking-tight text-base-content'>
                {metric.value}
              </p>
              
            </article>
          ))}
        </div>
      )}

      {children}
    </section>
  )
}

export const DashboardPanel = ({
  title,
  description,
  action,
  className = '',
  children,
}) => {
  return (
    <section
      className={joinClasses(
        'rounded-[1.75rem] border border-base-300/70 bg-base-100 p-5 shadow-sm sm:p-6',
        className
      )}
    >
      {(title || description || action) && (
        <header className='mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div className='space-y-2'>
            {title && (
              <h2 className='text-2xl font-semibold tracking-tight text-base-content'>
                {title}
              </h2>
            )}
          </div>
          {action && <div className='shrink-0'>{action}</div>}
        </header>
      )}
      {children}
    </section>
  )
}

export const DashboardBadge = ({ tone = 'neutral', children }) => {
  return (
    <span
      className={joinClasses(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize',
        badgeByTone[tone] || badgeByTone.neutral
      )}
    >
      {children}
    </span>
  )
}

export const DashboardEmptyState = ({
  title,
  description,
  action,
  compact = false,
}) => {
  return (
    <div
      className={joinClasses(
        'rounded-[1.5rem] border border-dashed border-base-300 bg-base-200/45 text-center',
        compact ? 'p-8' : 'p-10 sm:p-12'
      )}
    >
      <h3 className='text-lg font-semibold text-base-content'>{title}</h3>
      <p className='mx-auto mt-3 max-w-xl text-sm leading-7 text-base-content/65'>
        {description}
      </p>
      {action && <div className='mt-5'>{action}</div>}
    </div>
  )
}

export const DashboardTable = ({
  title,
  description,
  columns,
  rowCount,
  countLabel = 'Order',
  children,
  action,
  emptyTitle,
  emptyDescription,
  emptyAction,
}) => {
  return (
    <DashboardPanel
      title={title}
      description={description}
      action={
        <div className='flex items-center gap-3'>
          <DashboardBadge tone='neutral'>
            {rowCount} {rowCount === 1 ? countLabel : `${countLabel}s`}
          </DashboardBadge>
          {action}
        </div>
      }
    >
      {rowCount > 0 ? (
        <div className='overflow-x-auto'>
          <table className='min-w-full border-separate border-spacing-0'>
            <thead>
              <tr className='border-b border-base-300/70'>
                {columns.map(column => (
                  <th
                    key={column}
                    scope='col'
                    className={dashboardTableHeaderClassName}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      ) : (
        <DashboardEmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
          compact
        />
      )}
    </DashboardPanel>
  )
}

export const DashboardActionLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className='inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-content transition hover:brightness-95'
    >
      {children}
    </Link>
  )
}
