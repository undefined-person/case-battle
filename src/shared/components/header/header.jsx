import Avatar from '../../assets/images/avatar.png'
import StarIcon from '../../assets/icons/star.svg?react'
import { useState } from 'react'

import styles from './header.module.scss'
import { useTranslation } from 'react-i18next'
import Button from '../../ui/button/button'
import TonIcon from '../../assets/icons/ton.svg?react'

export default function Header({ className }) {
  const { t } = useTranslation()
  const [isShowConnectWallet, setIsShowConnectWallet] = useState(false)
  return (
    <header className={className}>
      <div className={styles.balance_container}>
        <div className={styles.user_info}>
          <img src={Avatar} alt="avatar" className={styles.avatar} />
          <h3>{t('profile.title')}</h3>
        </div>
        <button className={styles.balance_button} onClick={() => setIsShowConnectWallet(true)}>
          <div className={styles.balance_info}>
            <StarIcon className={styles.star} />
            <span>0</span>
          </div>
          <span className={styles.plus}>+</span>
        </button>
      </div>
      {isShowConnectWallet ? (
        <Button className={styles.connect_wallet_button}>
          {t('connect_to_wallet')}
          <TonIcon />
        </Button>
      ) : null}
    </header>
  )
}
