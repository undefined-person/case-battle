import React from 'react'
import styles from './toast.module.scss'
import Card from '../card/card'

export default function Toast({ message, visible }) {
  if (!visible) return null
  return (
    <div className={styles.toast_container}>
      <Card className={styles.toast_card}>{message}</Card>
    </div>
  )
}
