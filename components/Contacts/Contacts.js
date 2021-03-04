import React, { useEffect, useState } from 'react'
import { useContacts } from '../../context/ContactsProvider'
import useLocalStorage from '../../hooks/useLocalStorage'
import { AddUserButton } from '../Buttons/Buttons'
import Chat from '../Chat/Chat'
import Modal from '../Modal/Modal'
import styles from './contacts.module.css'

const Contacts = () => {
  const [id, setId] = useLocalStorage('id')

  const { contacts, createContact } = useContacts()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCopyActive, setIsCopyActive] = useState(false)
  const [data, setData] = useState({
    id: '',
    name: '',
  })

  const onModalOpen = () => setIsModalOpen(true)
  const onModalClose = () => {
    setData({ id: '', name: '' })
    setIsModalOpen(false)
  }

  const handleClickCopy = () => {
    setIsCopyActive(true)
    navigator.clipboard.writeText(id)
    setTimeout(() => {
      setIsCopyActive(false)
    }, 1000)
  }

  const callBack = () => {
    createContact(data)
    setData({ id: '', name: '' })
    onModalClose()
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          modalConfig={{
            title: 'Add your friend!',
            helper: 'Ask him/her for the id 😄',
            submit: 'Add',
            cancel: 'Cancel',
            inputPrimary: 'Your friend name',
            inputSecondary: 'Your friend id',
            callBack,
            setData,
            data,
          }}
          onModalClose={onModalClose}
        />
      )}
      <div className={styles.contacts_container}>
        <div className={styles.contacts_container__head_container}>
          <div
            style={isCopyActive ? { display: 'initial' } : {}}
            className={styles.head_container__tooltip}
          >
            <span className={styles.tooltip__tooltip_text}>#{id} Copied!</span>
          </div>
          <p className={styles.head_container__user_id}>
            Your id{' '}
            <span onClick={handleClickCopy} className={styles.user_id__id}>
              #{id}
            </span>
          </p>
          <div onClick={onModalOpen} className={styles.head_container__button}>
            <AddUserButton stroke={'#696969'} />
          </div>
        </div>
        {contacts.map(contact => (
          <Chat key={contact.id} contact={contact} />
        ))}
      </div>
    </>
  )
}

export default Contacts
