import Avatar from '../../assets/images/avatar.png'
import StarIcon from '../../assets/icons/star.svg?react'

import styles from './header.module.scss'

export default function Header() {
  return (
    <header>
      <div className={styles.balance_container}>
        <div className={styles.user_info}>
          <img src={Avatar} alt="avatar" className={styles.avatar} />
          <h3>Your Name</h3>
        </div>
        <button className={styles.balance_button}>
          <div className={styles.balance_info}>
            <StarIcon className={styles.star} />
            <span>205</span>
          </div>
          <span className={styles.plus}>+</span>
        </button>
      </div>
    </header>
  )
}
