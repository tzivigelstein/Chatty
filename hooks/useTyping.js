import { useContext, useState } from 'react'
import { useSocket } from '../context/socketContext'

const useUserTyping = recipients => {
  const socket = useSocket()

  const [isTyping, changeIsTyping] = useState(false)

  let timeout
  const setIsTyping = e => {
    if (e.charcode !== 13) {
      changeIsTyping(true)
      socket.emit('typing', { isTyping: true, recipients })
      clearTimeout(timeout)
      timeout = setTimeout(typingTimeout, 3000)
    } else {
      clearTimeout(timeout)
    }
  }

  const typingTimeout = () => {
    changeIsTyping(false)
    socket.emit('typing', { isTyping: false, recipients })
  }

  return setIsTyping
}

export default useUserTyping
