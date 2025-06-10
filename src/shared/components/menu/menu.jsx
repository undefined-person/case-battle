import styles from './menu.module.scss'

import { Link, useLocation } from 'react-router'
import { menuItems } from '../../constants/menu-items'

export default function Menu() {
  const { pathname } = useLocation()

  return (
    <nav className={styles.menu}>
      <ul className={styles.menu_list}>
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link to={item.link} className={`${styles.menu_item} ${pathname === item.link ? styles.active : ''}`}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
