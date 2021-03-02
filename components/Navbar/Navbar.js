import React, { useEffect, useState } from 'react'
import { useConversations } from '../../context/ConversationProvider'
import { useSocket } from '../../context/socketContext'
import styles from './navbar.module.css'

const Navbar = ({ recipients, LeftComponent, RightComponent }) => {
  const { selectConversationIndex } = useConversations()
  const socket = useSocket()
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!socket) return
    socket.on('userIsTyping', info => {
      setIsTyping(info.isTyping)
    })

    return () => socket.disconnect()
  }, [socket])
  return (
    <nav className={styles.nav}>
      <div id={styles.nav__left_component_container_hide}>
        <div
          onClick={() => selectConversationIndex(null)}
          className={styles.left_component_container}
        >
          {LeftComponent && <LeftComponent title="Chats" />}
        </div>
      </div>
      <div className={styles.nav__title_container}>
        <span className={styles.title_container__title}>
          {Array.isArray(recipients) && recipients.map(r => r.name).join(', ')}
        </span>

        {isTyping && (
          <span className={styles.title_container__typing}>Typing...</span>
        )}
      </div>
      <div className={styles.nav__right_component_container}>
        {RightComponent && <RightComponent />}
      </div>
    </nav>
  )
}

export default Navbar
