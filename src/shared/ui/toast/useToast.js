import { useState, useCallback } from 'react'

export default function useToast(timeout = 2500) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  const showToast = useCallback(
    (msg) => {
      setMessage(msg)
      setVisible(true)
      setTimeout(() => setVisible(false), timeout)
    },
    [timeout]
  )

  return { visible, message, showToast }
}
