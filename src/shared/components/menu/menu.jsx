import styles from './menu.module.scss'

import { Link, useLocation } from 'react-router'
import { menuItems } from '../../constants/menu-items'
import { useTranslation } from 'react-i18next'

export default function Menu() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <nav className={styles.menu}>
      <ul className={styles.menu_list}>
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link to={item.link} className={`${styles.menu_item} ${pathname === item.link ? styles.active : ''}`}>
              {item.icon}
              <span>{t(item.label)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
