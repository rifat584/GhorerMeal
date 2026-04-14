import { useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ConversationThread from '../Chat/ConversationThread'
import LoadingSpinner from '../Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const ChatModal = ({ chefId, chefName, closeModal, isOpen }) => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()

  const {
    data: conversation= null,
    isLoading: isConversationLoading,
    isError: isConversationError,
    error: conversationError,
  } = useQuery({
    queryKey: ['conversation', user?.email, chefId],
    enabled: isOpen && !!user?.email && !!user?.accessToken && !!chefId,
    queryFn: async () => {
      const response = await axiosSecure.get(`/conversations/${chefId}`)
      return response.data
    },
  })
console.log(conversation);
  const {
    data: messages = [],
    isLoading: isMessagesLoading,
    isError: isMessagesError,
    error: messagesError,
  } = useQuery({
    queryKey: ['messages', conversation?._id],
    enabled: isOpen && !!conversation?._id,
    queryFn: async () => {
      const response = await axiosSecure.get(`/messages/${conversation._id}`)
      return response.data
    },
  })

  const { mutateAsync: sendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: async text => {
      let conversationId = conversation?._id

      if (!conversationId) {
        const conversationResponse = await axiosSecure.post('/conversations', {
          chefId,
        })
        conversationId = conversationResponse.data._id
      }

      await axiosSecure.post('/messages', {
        conversationId,
        text,
      })

      return conversationId
    },
    onSuccess: async conversationId => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['conversations', user?.email] }),
        queryClient.invalidateQueries({ queryKey: ['messages', conversationId] }),
      ])
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Could not send your message')
    },
  })

  const { mutate: markConversationAsRead } = useMutation({
    mutationFn: async conversationId => {
      await axiosSecure.patch(`/conversations/read/${conversationId}`)
    },
    onSuccess: async (_result, conversationId) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['conversations', user?.email] }),
        queryClient.invalidateQueries({ queryKey: ['messages', conversationId] }),
      ])
    },
  })

  useEffect(() => {
    if (!conversation || !conversation.customerUnreadCount) {
      return
    }

    markConversationAsRead(conversation._id)
  }, [conversation, markConversationAsRead])

  const isLoading = isConversationLoading || isMessagesLoading
  const hasError = isConversationError || isMessagesError
  const errorMessage =
    conversationError?.response?.data?.message ||
    messagesError?.response?.data?.message ||
    'Chat is not available right now.'

  return (
    <Dialog
      open={isOpen}
      onClose={isSendingMessage ? () => {} : closeModal}
      className='relative z-50 focus:outline-none'
    >
      <div className='fixed inset-0 bg-base-content/45 backdrop-blur-sm' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel className='flex h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-2xl'>
          <header className='border-b border-base-300/80 px-6 py-5'>
            <DialogTitle className='text-2xl font-semibold tracking-tight text-base-content'>
              Message {chefName}
            </DialogTitle>
            <p className='mt-2 text-sm leading-7 text-base-content/70'>
              Ask about delivery timing, ingredients, or anything else you want
              to know before placing an order.
            </p>
          </header>

          <div className='flex-1 p-4 sm:p-6'>
            {isLoading ? (
              <div className='flex h-full items-center justify-center'>
                <LoadingSpinner smallHeight />
              </div>
            ) : hasError ? (
              <div className='flex h-full items-center justify-center rounded-[1.5rem] border border-base-300 bg-base-200/45 px-5 text-center text-sm leading-7 text-base-content/68'>
                {errorMessage}
              </div>
            ) : (
              <ConversationThread
                key={conversation?._id || chefId}
                title={conversation?.chefName || chefName}
                subtitle={conversation?.chefEmail || 'Chef conversation'}
                messages={messages}
                currentUserEmail={user?.email}
                isLoadingMessages={false}
                isSendingMessage={isSendingMessage}
                onSendMessage={sendMessage}
              />
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default ChatModal
