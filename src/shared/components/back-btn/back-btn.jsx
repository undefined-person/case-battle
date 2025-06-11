import styles from './back-btn.module.scss'
import LeftIcon from '../../assets/icons/left.svg?react'

export default function BackBtn({ onClick }) {
  return (
    <button className={styles.back_btn} onClick={onClick}>
      <LeftIcon />
    </button>
  )
}
