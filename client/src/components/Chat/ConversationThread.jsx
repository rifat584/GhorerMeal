import { useState } from 'react'

const formatMessageTime = dateValue => {
  if (!dateValue) return ''

  return new Date(dateValue).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

const ConversationThread = ({
  title,
  subtitle,
  messages,
  currentUserEmail,
  isLoadingMessages,
  isSendingMessage,
  onSendMessage,
}) => {
  const [messageText, setMessageText] = useState('')
  const canSendMessage = messageText.trim().length > 0 && !isSendingMessage

  const handleSubmit = async event => {
    event.preventDefault()

    const nextMessage = messageText.trim()

    if (!nextMessage) {
      return
    }

    const wasSent = await onSendMessage(nextMessage).then(
      () => true,
      () => false
    )

    if (wasSent) {
      setMessageText('')
    }
  }

  return (
    <section className='flex h-full flex-col rounded-[1.75rem] border border-base-300/70 bg-base-100 p-5 shadow-sm sm:p-6'>
      <header className='border-b border-base-300/80 pb-4'>
        <h2 className='text-xl font-semibold tracking-tight text-base-content'>
          {title}
        </h2>
        {subtitle && (
          <p className='mt-2 text-sm text-base-content/65'>{subtitle}</p>
        )}
      </header>

      <div className='mt-5 flex-1 overflow-hidden'>
        {isLoadingMessages ? (
          <div className='flex h-full items-center justify-center rounded-[1.5rem] border border-base-300 bg-base-200/45 px-4 text-sm text-base-content/65'>
            Loading messages...
          </div>
        ) : messages.length > 0 ? (
          <div className='flex h-full flex-col gap-3 overflow-y-auto rounded-[1.5rem] border border-base-300 bg-base-200/35 p-4'>
            {messages.map(message => {
              const isCurrentUserMessage = message.senderEmail === currentUserEmail

              return (
                <article
                  key={message._id}
                  className={`max-w-[85%] rounded-[1.25rem] px-4 py-3 text-sm leading-7 ${
                    isCurrentUserMessage
                      ? 'ml-auto bg-primary text-primary-content'
                      : 'bg-base-100 text-base-content shadow-sm'
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`mt-2 text-xs ${
                      isCurrentUserMessage
                        ? 'text-primary-content/75'
                        : 'text-base-content/45'
                    }`}
                  >
                    {formatMessageTime(message.createdAt)}
                  </p>
                </article>
              )
            })}
          </div>
        ) : (
          <div className='flex h-full items-center justify-center rounded-[1.5rem] border border-dashed border-base-300 bg-base-200/35 px-5 text-center text-sm leading-7 text-base-content/65'>
            Send the first message to start this conversation.
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className='mt-5 flex flex-col gap-3 sm:flex-row sm:items-end'
      >
        <label className='flex-1'>
          <span className='sr-only'>Message</span>
          <textarea
            value={messageText}
            onChange={event => setMessageText(event.target.value)}
            placeholder='Write a message'
            className='min-h-24 w-full rounded-2xl border border-base-300 bg-base-100 px-4 py-3 text-sm text-base-content outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10'
          />
        </label>

        <button
          type='submit'
          disabled={!canSendMessage}
          className='btn btn-primary rounded-full px-6 sm:self-end'
        >
          {isSendingMessage ? 'Sending...' : 'Send'}
        </button>
      </form>
    </section>
  )
}

export default ConversationThread
