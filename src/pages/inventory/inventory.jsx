import Header from '../../shared/components/header/header'
import BackBtn from '../../shared/components/back-btn/back-btn'
import { useNavigate } from 'react-router'
import styles from './inventory.module.scss'
import StarIcon from '../../shared/assets/icons/star.svg?react'
import { inventory } from '../../shared/constants/inventory'
import Card from '../../shared/ui/card/card'
import Button from '../../shared/ui/button/button'

export default function Inventory() {
  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <div className={styles.header_container}>
        <BackBtn className={styles.back_btn} onClick={() => navigate(-1)} />
        <h1>Инвентарь</h1>
      </div>
      <div className={styles.inventory_container}>
        {inventory.map((item) => (
          <Card key={item.id} className={styles.inventory_item}>
            <img src={item.image} alt={item.title} />
            <h3 className={styles.inventory_item_title}>{item.title}</h3>
            <div className={styles.inventory_item_buttons}>
              <Button>
                Продать за {item.price} <StarIcon />
              </Button>
              <Button>
                Вывести за {item.price} <StarIcon />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
