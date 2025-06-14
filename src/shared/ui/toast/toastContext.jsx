import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  const showToast = useCallback((msg, timeout = 2500) => {
    setMessage(msg)
    setVisible(true)
    setTimeout(() => setVisible(false), timeout)
  }, [])

  return <ToastContext.Provider value={{ visible, message, showToast }}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
