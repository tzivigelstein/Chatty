import React, { useContext, useEffect } from 'react'
import styles from './main.module.css'
import Controls from '../Controls/Controls'
import Messages from '../Messages/Messages'
import { BackButton } from '../Buttons/Buttons'
import Navbar from '../Navbar/Navbar'
import MainPlaceholder from '../MainPlaceholder/MainPlaceholder'
import { useConversations } from '../../context/ConversationProvider'

const Main = active => {
  const { selectedConversation } = useConversations()
  return (
    <div
      className={`${styles.main} ${
        active.active ? styles.not_active : styles.active
      }`}
    >
      {!active.active ? (
        <>
          <Navbar
            LeftComponent={BackButton}
            recipients={selectedConversation.recipients}
          />
          <Messages />
          <Controls />
        </>
      ) : (
        <MainPlaceholder />
      )}
    </div>
  )
}

export default Main
