import Avatar from '../../shared/assets/images/avatar.png'
import GiftIcon from '../../shared/assets/icons/gift.svg?react'
import HistoryIcon from '../../shared/assets/icons/history.svg?react'
import ArrowsIcon from '../../shared/assets/icons/arrows.svg?react'
import PlusIcon from '../../shared/assets/icons/plus.svg?react'
import { useNavigate } from 'react-router'
import styles from './profile.module.scss'
import Button from '../../shared/ui/button/button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from '../../shared/ui/toast/toastContext'

const menuItems = [
  {
    label: 'menu.inventory',
    icon: <GiftIcon />,
    link: '/profile/inventory',
  },
  {
    label: 'menu.history',
    icon: <HistoryIcon />,
    link: '/profile/history',
  },
  {
    label: 'menu.upgrades',
    icon: <ArrowsIcon />,
    link: '/profile/upgrade',
  },
]

export default function Profile() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { showToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [promoCode, setPromoCode] = useState('')

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const handlePromoCodeSubmit = () => {
    if (!promoCode) {
      showToast(t('profile.menu.promoCodeRequired'))
      return
    }

    showToast(t('profile.menu.promoCodeActivated'))
    setIsOpen(false)
  }

  return (
    <div>
      <div className={styles.profile_container}>
        <img src={Avatar} alt="avatar" className={styles.profile_avatar} />
        <div className={styles.profile_info}>
          <h1 className={styles.profile_name}>{t('profile.title')}</h1>
          <p className={styles.profile_id}>{t('profile.userId', { id: '1803167' })}</p>
        </div>
      </div>
      <div className={styles.menu_container}>
        {menuItems.map((item) => (
          <div key={item.label} className={styles.menu_item} onClick={() => navigate(item.link)}>
            {item.icon}
            {t(`profile.${item.label}`)}
          </div>
        ))}
        <div
          className={styles.promo_container}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}>
          <div className={`${styles.promo_header} ${isOpen ? styles.active : ''}`}>
            <PlusIcon />
            <span>{t('profile.menu.promoCode')}</span>
          </div>
          {isOpen && (
            <div className={styles.promo_content} onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder={t('profile.menu.enterPromo')}
                className={styles.promo_input}
                value={promoCode}
                onChange={(e) => {
                  e.stopPropagation()
                  setPromoCode(e.target.value)
                }}
              />
              <Button
                className={styles.promo_button}
                onClick={(e) => {
                  e.stopPropagation()
                  handlePromoCodeSubmit()
                }}>
                {t('profile.menu.activate')}
              </Button>
            </div>
          )}
        </div>
        <div className={styles.language_container}>
          <span>{t('profile.language.select')}</span>
          <div className={styles.language_buttons}>
            <Button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? styles.active : ''}>
              English
            </Button>
            <Button onClick={() => changeLanguage('ru')} className={i18n.language === 'ru' ? styles.active : ''}>
              Русский
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
