import React from 'react'
import '../styles/globals.css'
import Head from 'next/head'
import { SocketProvider } from '../context/socketContext'
import { ConversationProvider } from '../context/ConversationProvider'
import { ContactsProvider } from '../context/ContactsProvider'
import useLocalStorage from '../hooks/useLocalStorage'

function MyApp({ Component, pageProps }) {
  const [id, setId] = useLocalStorage('id')
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <title>Chat</title>
      </Head>
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationProvider id={id}>
            <Component {...pageProps} />
          </ConversationProvider>
        </ContactsProvider>
      </SocketProvider>
    </>
  )
}

export default MyApp
