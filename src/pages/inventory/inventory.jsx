import { useEffect, useState } from 'react'
import BackBtn from '../../shared/components/back-btn/back-btn'
import { useNavigate, useLocation } from 'react-router'
import styles from './inventory.module.scss'
import StarIcon from '../../shared/assets/icons/star.svg?react'
import { inventory as inventoryData } from '../../shared/constants/inventory'
import Card from '../../shared/ui/card/card'
import Button from '../../shared/ui/button/button'
import TGSAnimation from '../../shared/components/tgs-animation/tgs-animation'
import { useTranslation } from 'react-i18next'

export default function Inventory() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [inventory, setInventory] = useState(inventoryData)

  useEffect(() => {
    return () => {
      const canvases = document.querySelectorAll('.lottie-canvas')
      canvases.forEach((canvas) => {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          canvas.width = 0
          canvas.height = 0
        }
      })
      window.lottie?.destroy()
    }
  }, [location])

  const removeItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id))
  }

  return (
    <div>
      <div className={styles.header_container}>
        <BackBtn className={styles.back_btn} onClick={() => navigate(-1)} />
        <h1>{t('inventory.title')}</h1>
      </div>
      <div className={styles.inventory_container}>
        {inventory.map((item) => (
          <Card key={item.id} className={styles.inventory_item}>
            <TGSAnimation
              src={item.image}
              autoplay={true}
              playonce={false}
              playbyclick={true}
              key={`${item.id}-${location.key}`}
            />
            <h3 className={styles.inventory_item_title}>{item.title}</h3>
            <div className={styles.inventory_item_buttons}>
              <Button onClick={() => removeItem(item.id)}>
                {t('inventory.sell_for')} {item.price} <StarIcon />
              </Button>
              <Button onClick={() => removeItem(item.id)}>
                {t('inventory.withdraw_for')} {item.price} <StarIcon />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
