import React, { forwardRef } from 'react'
import styles from './message.module.css'

const Message = forwardRef(({ message, time, id }, ref) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  }
  const formatedTime = new Date(time).toLocaleTimeString('es-ES', options)
  return (
    <div ref={ref} id={styles[id]} className={styles.message_container}>
      <p className={styles.message_container__content}>{message}</p>
      <time className={styles.message_container__time}>{formatedTime}</time>
    </div>
  )
})

export default Message
