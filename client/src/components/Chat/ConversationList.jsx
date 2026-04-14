import { DashboardBadge } from '../Dashboard/DashboardUI'

const formatConversationTime = dateValue => {
  if (!dateValue) return ''

  return new Date(dateValue).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const getOtherPersonName = (conversation, role) => {
  return role === 'chef' ? conversation.customerName : conversation.chefName
}

const getOtherPersonEmail = (conversation, role) => {
  return role === 'chef' ? conversation.customerEmail : conversation.chefEmail
}

const getUnreadCount = (conversation, role) => {
  return role === 'chef'
    ? Number(conversation.chefUnreadCount || 0)
    : Number(conversation.customerUnreadCount || 0)
}

const ConversationList = ({
  conversations,
  activeConversationId,
  role,
  onSelectConversation,
}) => {
  return (
    <div className='space-y-3'>
      {conversations.map(conversation => {
        const isActive = conversation._id === activeConversationId
        const otherPersonName = getOtherPersonName(conversation, role)
        const otherPersonEmail = getOtherPersonEmail(conversation, role)
        const unreadCount = getUnreadCount(conversation, role)

        return (
          <button
            key={conversation._id}
            type='button'
            onClick={() => onSelectConversation(conversation._id)}
            className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition ${
              isActive
                ? 'border-primary/25 bg-primary/10'
                : 'border-base-300 bg-base-200/35 hover:border-primary/20 hover:bg-base-200/55'
            }`}
          >
            <div className='flex items-start justify-between gap-3'>
              <div className='min-w-0'>
                <p className='truncate text-base font-semibold text-base-content'>
                  {otherPersonName}
                </p>
                <p className='truncate text-sm text-base-content/55'>
                  {otherPersonEmail}
                </p>
              </div>

              <div className='shrink-0 text-right'>
                <p className='text-xs uppercase tracking-[0.18em] text-base-content/45'>
                  {formatConversationTime(
                    conversation.lastMessageAt || conversation.updatedAt
                  )}
                </p>

                {unreadCount > 0 && (
                  <div className='mt-2 flex justify-end'>
                    <DashboardBadge tone='primary'>{unreadCount} new</DashboardBadge>
                  </div>
                )}
              </div>
            </div>

            <p className='mt-3 line-clamp-2 text-sm leading-7 text-base-content/68'>
              {conversation.lastMessage || 'No messages yet'}
            </p>
          </button>
        )
      })}
    </div>
  )
}

export default ConversationList
