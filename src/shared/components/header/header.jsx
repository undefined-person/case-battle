import Avatar from '../../assets/images/avatar.png'
import StarIcon from '../../assets/icons/star.svg?react'

import styles from './header.module.scss'
import { useTranslation } from 'react-i18next'

export default function Header({ className }) {
  const { t } = useTranslation()
  return (
    <header className={className}>
      <div className={styles.balance_container}>
        <div className={styles.user_info}>
          <img src={Avatar} alt="avatar" className={styles.avatar} />
          <h3>{t('profile.title')}</h3>
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
