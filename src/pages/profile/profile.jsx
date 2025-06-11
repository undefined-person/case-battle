import Header from '../../shared/components/header/header'
import Avatar from '../../shared/assets/images/avatar.png'
import GiftIcon from '../../shared/assets/icons/gift.svg?react'
import HistoryIcon from '../../shared/assets/icons/history.svg?react'
import ArrowsIcon from '../../shared/assets/icons/arrows.svg?react'
import PlusIcon from '../../shared/assets/icons/plus.svg?react'
import { useNavigate } from 'react-router'
import styles from './profile.module.scss'
import Button from '../../shared/ui/button/button'
import { useState } from 'react'

const menuItems = [
  {
    label: 'Инвентарь',
    icon: <GiftIcon />,
    link: '/profile/inventory',
  },
  {
    label: 'История',
    icon: <HistoryIcon />,
    link: '/profile/history',
  },
  {
    label: 'Апгрейды',
    icon: <ArrowsIcon />,
    link: '/profile/upgrade',
  },
]

export default function Profile() {
  const navigate = useNavigate()
  const [language, setLanguage] = useState('en')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Header />
      <div className={styles.profile_container}>
        <img src={Avatar} alt="avatar" className={styles.profile_avatar} />
        <div className={styles.profile_info}>
          <h1 className={styles.profile_name}>Your Name</h1>
          <p className={styles.profile_id}>User ID 1803167</p>
        </div>
      </div>

      <div className={styles.menu_container}>
        {menuItems.map((item) => (
          <div key={item.label} className={styles.menu_item} onClick={() => navigate(item.link)}>
            {item.icon}
            {item.label}
          </div>
        ))}
        <div className={styles.promo_container} onClick={() => setIsOpen(!isOpen)}>
          <div className={`${styles.promo_header} ${isOpen ? styles.active : ''}`}>
            <PlusIcon />
            <span>Активировать промокод</span>
          </div>
          {isOpen && (
            <div className={styles.promo_content}>
              <input type="text" placeholder="Введите промокод" className={styles.promo_input} />
              <Button className={styles.promo_button}>Активировать</Button>
            </div>
          )}
        </div>

        <div className={styles.language_container}>
          <span>Вибрать язык</span>
          <div className={styles.language_buttons}>
            <Button onClick={() => setLanguage('en')} className={language === 'en' ? styles.active : ''}>
              English
            </Button>
            <Button onClick={() => setLanguage('ru')} className={language === 'ru' ? styles.active : ''}>
              Русский
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
