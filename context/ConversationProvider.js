import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './socketContext'

const ConversationsContext = createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(
    null
  )
  const { contacts } = useContacts()
  const socket = useSocket()

  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(
    ({ recipients, message, sender, time }) => {
      setConversations(prevConversations => {
        let madeChange = false
        const newMessage = { sender, message, time }
        const newConversations = prevConversations.map(conversation => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            }
          }
          return conversation
        })
        if (madeChange) {
          return newConversations
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }]
        }
      })
    },
    [setConversations]
  )

  useEffect(() => {
    if (!socket) return
    socket.on('receive-message', addMessageToConversation)

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  function sendMessage(recipients, message) {
    socket.emit('send-message', { recipients, message })
  }

  const formmatedConversations =
    Array.isArray(conversations) &&
    conversations.map((conversation, index) => {
      const recipients =
        Array.isArray(conversations) &&
        Array.isArray(conversation.recipients) &&
        conversation.recipients.map(recipient => {
          const contact = contacts.find(contact => contact.id === recipient)
          const name =
            (contact && contact.name) ||
            (recipient === id && 'You') ||
            recipient

          return { id: recipient, name }
        })

      const messages = conversation.messages.map(message => {
        const contact = contacts.find(contact => {
          return contact.id === message.sender
        })

        const name = (contact && contact.name) || message.sender
        const fromMe = id === message.sender
        return {
          ...message,
          senderName: name,
          fromMe,
        }
      })

      const selected = index === selectedConversationIndex
      return { ...conversation, messages, recipients, selected }
    })

  function arrayEquality(a, b) {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
      return element === b[index]
    })
  }

  const value = {
    conversations: formmatedConversations,
    selectedConversation: formmatedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}
