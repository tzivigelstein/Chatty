import React from 'react'
import styles from './main_placeholder.module.css'

const MainPlaceholder = () => {
  return (
    <div className={styles.placeholder_container}>
      <img
        className={styles.placeholder_container__image}
        src="/updates.svg"
        alt=""
      />
      <div className={styles.placeholder_container__text_container}>
        <p className={styles.text_container__title}>Communication is freedom</p>
        <p className={styles.text_container__text}>
          Pick a chat and start communicating.
        </p>
      </div>
    </div>
  )
}

export default MainPlaceholder
