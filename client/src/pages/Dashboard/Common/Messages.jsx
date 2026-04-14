import { Link, Navigate } from 'react-router'
import ConversationList from '../../../components/Chat/ConversationList'
import ConversationThread from '../../../components/Chat/ConversationThread'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useDashboardMessages from '../../../hooks/useDashboardMessages'
import {
  DashboardEmptyState,
  DashboardPage,
  DashboardPanel,
} from '../../../components/Dashboard/DashboardUI'

const Messages = () => {
  const {
    user,
    role,
    conversations,
    activeConversation,
    messages,
    isMessagesLoading,
    isSendingMessage,
    isPageLoading,
    selectConversation,
    sendMessage,
  } = useDashboardMessages()

  if (isPageLoading) {
    return <LoadingSpinner />
  }

  if (role === 'admin') {
    return <Navigate to='/dashboard/profile' replace />
  }

  const emptyAction =
    role === 'user' ? (
      <Link to='/all-meals' className='btn btn-primary rounded-full px-6'>
        Explore meals
      </Link>
    ) : null

  const emptyDescription =
    role === 'user'
      ? 'Start a conversation from any meal page and your chef chats will appear here.'
      : 'Customer messages will appear here once someone starts a conversation from a meal page.'

  return (
    <DashboardPage
      title='Messages'
      description='Keep your customer-chef conversations in one place and continue them whenever you need to.'
    >
      {conversations.length === 0 ? (
        <DashboardPanel>
          <DashboardEmptyState
            title='No conversations yet'
            description={emptyDescription}
            action={emptyAction}
            compact
          />
        </DashboardPanel>
      ) : (
        <section className='grid gap-6 xl:grid-cols-[22rem_minmax(0,1fr)]'>
          <DashboardPanel title='Inbox'>
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversation?._id}
              role={role}
              onSelectConversation={selectConversation}
            />
          </DashboardPanel>

          {activeConversation ? (
            <ConversationThread
              key={activeConversation._id}
              title={
                role === 'chef'
                  ? activeConversation.customerName
                  : activeConversation.chefName
              }
              subtitle={
                role === 'chef'
                  ? activeConversation.customerEmail
                  : activeConversation.chefEmail
              }
              messages={messages}
              currentUserEmail={user?.email}
              isLoadingMessages={isMessagesLoading}
              isSendingMessage={isSendingMessage}
              onSendMessage={sendMessage}
            />
          ) : (
            <DashboardPanel>
              <DashboardEmptyState
                title='Choose a conversation'
                description='Select a chef or customer from the inbox to continue the chat.'
                compact
              />
            </DashboardPanel>
          )}
        </section>
      )}
    </DashboardPage>
  )
}

export default Messages
