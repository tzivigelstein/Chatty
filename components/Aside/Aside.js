import React, { useState } from 'react'
import styles from './aside.module.css'
import Contacts from '../Contacts/Contacts'
import Conversations from '../Conversations/Conversations'

const Aside = active => {
  const [showContactsTab, setShowContactsTab] = useState(false)

  const activeStyles = {
    backgroundColor: '#1da0f2',
    color: '#ffe',
  }

  return (
    <div
      className={`${styles.aside} ${
        active.active ? styles.active : styles.not_active
      }`}
    >
      <div style={{ display: 'flex' }}>
        <div
          className={styles.tabs_container__tabs}
          onClick={() => {
            setShowContactsTab(false)
          }}
          style={!showContactsTab ? activeStyles : {}}
        >
          Conversations
        </div>
        <div
          className={styles.tabs_container__tabs}
          style={showContactsTab ? activeStyles : {}}
          onClick={() => {
            setShowContactsTab(true)
          }}
        >
          Contacts
        </div>
      </div>
      {showContactsTab ? <Contacts /> : <Conversations />}
    </div>
  )
}

export default Aside
