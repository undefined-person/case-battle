import Header from '../components/header/header'
import Menu from '../components/menu/menu'
import ScrollToTop from '../components/scroll-to-top/scroll-to-top'
import styles from './main-layout.module.scss'
import { ToastProvider } from '../ui/toast/toastContext'
import Toast from '../ui/toast/toast'
import { useToast } from '../ui/toast/toastContext'

function MainLayoutContent({ children }) {
  const { visible, message } = useToast()

  return (
    <main className={styles.main_layout}>
      <ScrollToTop />
      <Header />
      {children}
      <Menu />
      <Toast message={message} visible={visible} />
    </main>
  )
}

export default function MainLayout({ children }) {
  return (
    <ToastProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </ToastProvider>
  )
}
