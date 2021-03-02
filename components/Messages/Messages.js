import React, { useCallback } from 'react'
import styles from './messages.module.css'
import Message from '../Message/Message'
import { useConversations } from '../../context/ConversationProvider'

const Messages = () => {
  const { selectedConversation } = useConversations()

  const setRef = useCallback(node => {
    node && node.scrollIntoView({ smooth: true })
  }, [])

  return (
    <ul className={styles.message_list}>
      {selectedConversation.messages.map((message, index) => {
        const lastMessage = selectedConversation.messages.length - 1 === index
        return (
          <Message
            ref={lastMessage === true ? setRef : null}
            id={message.fromMe ? 'i' : ''}
            key={(message.time / 21) * 2}
            time={message.time}
            message={message.message}
          />
        )
      })}
    </ul>
  )
}

export default Messages
