import { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const isBrowser = typeof window !== 'undefined' ? true : false

const SocketContext = createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = isBrowser
      ? io(process.env.BACKEND_URL, { query: { id } })
      : console.log('SSR')

    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
