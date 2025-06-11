import Menu from '../components/menu/menu'
import ScrollToTop from '../components/scroll-to-top/scroll-to-top'
import styles from './main-layout.module.scss'

export default function MainLayout({ children }) {
  return (
    <main className={styles.main_layout}>
      <ScrollToTop />
      {children}
      <Menu />
    </main>
  )
}
