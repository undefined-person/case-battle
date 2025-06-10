import Button from '../shared/ui/button/button'
import TonIcon from '../shared/assets/icons/ton.svg?react'
import styles from './cases.module.scss'
import { cases } from '../shared/constants/cases'
import Card from '../shared/ui/card/card'
import StarIcon from '../shared/assets/icons/star.svg?react'

export default function Cases() {
  return (
    <div>
      <Button>
        Подключить TON
        <TonIcon />
      </Button>
      <div className={styles.tabs}>
        <button className={styles.tab}>Фильтр1</button>
        <button className={styles.tab}>Фильтр2</button>
        <button className={styles.tab}>Фильтр3</button>
        <button className={styles.tab}>Фильтр4</button>
      </div>
      <div className={styles.cases}>
        {cases.map((item) => (
          <Card key={item.id} className={styles.case}>
            <img src={item.image} alt={item.title} className={styles.case_image} />
            <h3 className={styles.case_title}>{item.title}</h3>
            <div className={styles.case_price}>
              <StarIcon />
              <span>{item.price}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
