import {  useEffect } from 'react'
import styles from './index.module.css'
import Link from 'next/link'

const Index = () => {
  useEffect(() => {
  }, [])
  return (
    <div className={styles.wrapper}>
      <div>
        <Link href="/login">Login</Link>
      </div>
    </div>
  )
}

export default Index
