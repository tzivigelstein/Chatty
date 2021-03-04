import React, { useState } from 'react'
import styles from './controls.module.css'
import { SendButton } from '../Buttons/Buttons'
import useUserTyping from '../../hooks/useTyping'
import { useConversations } from '../../context/ConversationProvider'

const Controls = () => {
  const { sendMessage, selectedConversation } = useConversations()
  const [message, setMessage] = useState('')
  const setIsTyping = useUserTyping(
    Array.isArray(selectedConversation.recipients) &&
      selectedConversation.recipients.map(r => r.id)
  )

  const handleClick = () => {
    console.log(typeof selectedConversation.recipients)
    if (message === '') return
    sendMessage(
      Array.isArray(selectedConversation.recipients) &&
        selectedConversation.recipients.map(r => r.id),
      message
    )
    setMessage('')
  }

  return (
    <div className={styles.actions_container}>
      <div className={styles.actions_container__input_container}>
        <input
          className={styles.input_container__input}
          onKeyUp={e => setIsTyping(e)}
          onChange={e => setMessage(e.target.value)}
          placeholder="Write a message..."
          value={message}
          type="text"
        />
      </div>
      <div className={styles.input_container__action_button}>
        <div
          onClick={handleClick}
          className={styles.action_button__button_container}
        >
          <SendButton stroke={'#1da0f2'} width={24} height={24} />
        </div>
      </div>
    </div>
  )
}

export default Controls
