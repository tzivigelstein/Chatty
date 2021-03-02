import styles from './chat.module.css'
import Aside from '../components/Aside/Aside'
import Main from '../components/Main/Main'
import { useConversations } from '../context/ConversationProvider'

const Chat = () => {
  const { selectedConversation } = useConversations()
  return (
    <div className={styles.container}>
      <Main
        active={typeof selectedConversation === 'undefined' ? true : false}
      />
      <Aside
        active={typeof selectedConversation === 'undefined' ? true : false}
      />
    </div>
  )
}

export default Chat
