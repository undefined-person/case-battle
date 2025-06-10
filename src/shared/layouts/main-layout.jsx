import Menu from '../components/menu/menu'
import styles from './main-layout.module.scss'

export default function MainLayout({ children }) {
  return (
    <main className={styles.main_layout}>
      {children}
      <Menu />
    </main>
  )
}
