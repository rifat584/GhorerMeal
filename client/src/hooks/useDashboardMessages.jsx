import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import toast from 'react-hot-toast'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import useRole from './useRole'

const getUnreadCount = (conversation, role) => {
  return role === 'chef'
    ? Number(conversation.chefUnreadCount || 0)
    : Number(conversation.customerUnreadCount || 0)
}

const useDashboardMessages = () => {
  const { user, loading } = useAuth()
  const { role, isRoleLoading } = useRole()
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeConversationId = searchParams.get('conversation') || ''

  const { data: conversations = [], isLoading: isConversationsLoading } = useQuery({
    queryKey: ['conversations', user?.email],
    enabled:
      !!user?.email &&
      !!user?.accessToken &&
      !loading &&
      !isRoleLoading &&
      (role === 'user' || role === 'chef'),
    queryFn: async () => {
      const response = await axiosSecure.get('/conversations')
      return response.data
    },
  })

  const activeConversation =
    conversations.find(conversation => conversation._id === activeConversationId) ||
    null

  const { data: messages = [], isLoading: isMessagesLoading } = useQuery({
    queryKey: ['messages', activeConversation?._id],
    enabled: !!activeConversation?._id,
    queryFn: async () => {
      const response = await axiosSecure.get(`/messages/${activeConversation._id}`)
      return response.data
    },
  })

  const { mutateAsync: sendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: async ({ conversationId, text }) => {
      const response = await axiosSecure.post('/messages', {
        conversationId,
        text,
      })

      return response.data
    },
    onSuccess: async (_savedMessage, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['conversations', user?.email] }),
        queryClient.invalidateQueries({ queryKey: ['messages', variables.conversationId] }),
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
    if (!conversations.length) {
      return
    }

    const hasActiveConversation = conversations.some(
      conversation => conversation._id === activeConversationId
    )

    if (hasActiveConversation) {
      return
    }

    setSearchParams({ conversation: conversations[0]._id })
  }, [activeConversationId, conversations, setSearchParams])

  useEffect(() => {
    if (!activeConversation) {
      return
    }

    const unreadCount = getUnreadCount(activeConversation, role)

    if (!unreadCount) {
      return
    }

    markConversationAsRead(activeConversation._id)
  }, [activeConversation, markConversationAsRead, role])

  const handleSendMessage = text => {
    return sendMessage({
      conversationId: activeConversation._id,
      text,
    })
  }

  const selectConversation = conversationId => {
    setSearchParams({ conversation: conversationId })
  }

  return {
    user,
    role,
    conversations,
    activeConversation,
    messages,
    isMessagesLoading,
    isSendingMessage,
    isPageLoading: loading || isRoleLoading || isConversationsLoading,
    selectConversation,
    sendMessage: handleSendMessage,
  }
}

export default useDashboardMessages
