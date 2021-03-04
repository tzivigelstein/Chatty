import { useState } from 'react'
import { useContacts } from '../../context/ContactsProvider'
import { useConversations } from '../../context/ConversationProvider'
import useLocalStorage from '../../hooks/useLocalStorage'
import { NewConversationButton, UserIcon } from '../Buttons/Buttons'
import Modal from '../Modal/Modal'
import styles from './conversations.module.css'

const s = [
  {
    recipients: ['5f17e', 'f2328'],
    messages: [
      { sender: '5f17e', message: 'hola', time: 1614707938918 },
      { sender: 'f2328', message: 'Hey', time: 1614707987000 },
      {
        sender: 'f2328',
        message: 'Hey sup?, It seems that works, Its amazing',
        time: 1614708845464,
      },
    ],
  },
  { recipients: 2, messages: [] },
  { recipients: 2, messages: [] },
]

const Conversations = () => {
  const [id, setId] = useLocalStorage('id')

  const { contacts } = useContacts()
  const {
    conversations,
    createConversation,
    selectConversationIndex,
  } = useConversations()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCopyActive, setIsCopyActive] = useState(false)
  const [selectedContactIds, setSelectedContactIds] = useState([])

  const onModalOpen = () => setIsModalOpen(true)
  const onModalClose = () => {
    setSelectedContactIds([])
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
    createConversation([...selectedContactIds, id])
    setSelectedContactIds([])
    onModalClose()
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          modalConfig={{
            title: 'Create a new chat',
            helper: 'Secret tip: You can create more than 2 people chats 🤫',
            submit: 'Create',
            cancel: 'Cancel',
            checkBoxOptions: contacts,
            checkBoxState: selectedContactIds,
            checkBoxSet: setSelectedContactIds,
            callBack: callBack,
          }}
          onModalClose={onModalClose}
        />
      )}
      <div className={styles.conversations_container}>
        <div className={styles.conversations_container__head_container}>
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
            <NewConversationButton stroke={'#696969'} />
          </div>
        </div>
        {Array.isArray(conversations) &&
          conversations.map((conversation, index) => (
            <section
              key={index}
              onClick={() => selectConversationIndex(index)}
              className={styles.chat_container}
              style={conversation.active && { backgroundColor: '#1da0f2' }}
            >
              <div className={styles.chat_container__image_container}>
                <UserIcon width={49} height={49} stroke={'#eee'} />
              </div>
              <div className={styles.chat_container__info_container}>
                <p className={styles.info_container__name}>
                  {Array.isArray(conversations) &&
                    Array.isArray(conversation.recipients) &&
                    conversation.recipients.map(r => r.name).join(', ')}
                </p>
              </div>
            </section>
          ))}
      </div>
    </>
  )
}

export default Conversations
