import React from 'react'
import { useSocket } from '../../context/socketContext'
import { UserIcon } from '../Buttons/Buttons'
import styles from './chat.module.css'

const Chat = ({ contact }) => {
  const { name } = contact

  return (
    <section className={styles.chat_container}>
      <div className={styles.chat_container__image_container}>
        <UserIcon width={49} height={49} stroke={'#eee'} />
      </div>
      <div className={styles.chat_container__info_container}>
        <p className={styles.info_container__name}>{name}</p>
      </div>
    </section>
  )
}

export default Chat
