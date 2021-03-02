import React from 'react'
import styles from './buttons.module.css'

export const SendButton = props => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="#2165d9"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  )
}

export const BackButton = props => {
  const { title } = props
  return (
    <div className={styles.back_button_container}>
      <svg
        viewBox="0 0 24 24"
        width={24}
        height={24}
        stroke="#2165D9"
        strokeWidth={2}
        fill="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span className={styles.container__back_button_title}>{title}</span>
    </div>
  )
}

export const AddUserButton = props => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="#eee"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx={8.5} cy={7} r={4} />
      <path d="M20 8v6M23 11h-6" />
    </svg>
  )
}

export const CloseButton = props => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="#eee"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export const NewConversationButton = props => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="#eee"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export const UserIcon = props => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="#eee"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx={12} cy={7} r={4} />
    </svg>
  )
}
