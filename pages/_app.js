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
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <title>Chatty</title>
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
