import StarIcon from '../../shared/assets/icons/star.svg?react'
import CopyIcon from '../../shared/assets/icons/copy.svg?react'
import TicketIcon from '../../shared/assets/icons/ticket.svg?react'
import Button from '../../shared/ui/button/button'
import Card from '../../shared/ui/card/card'

import styles from './partners.module.scss'
import { partners } from '../../shared/constants/partners'

export default function Partners() {
  return (
    <div>
      <div className={styles.partners_container}>
        <p className={styles.partners_title}>
          Приглашай друзей - <br /> Получай награды!
        </p>
        <div className={styles.partners_info}>
          Каждый приглашенный друг = 100 <StarIcon />
        </div>
        <div className={styles.partners_buttons_container}>
          <Button className={styles.partners_button}>Пригласить друга</Button>
          <Button className={styles.partners_button}>
            <CopyIcon />
          </Button>
        </div>
        <Button className={styles.partners_button}>
          Создать промокод
          <TicketIcon />
        </Button>
      </div>
      <Card className={styles.partners_card}>
        <h2 className={styles.partners_card_title}>Приглашенные друзья</h2>
        <p className={styles.partners_card_info}>
          Друг вводит промокод и крутит кейс. <br /> Вы получаете 100 звезд после его пополнения.
        </p>
        <div className={styles.partners_items_container}>
          {partners.map((partner) => (
            <PartnerItem key={partner.id} {...partner} />
          ))}
        </div>
      </Card>
    </div>
  )
}

function PartnerItem({ image, name, status }) {
  return (
    <div className={styles.partners_item}>
      <img src={image} alt={name} />
      <p className={styles.partners_item_name}>{name}</p>
      <p className={styles.partners_item_status}>{status}</p>
    </div>
  )
}
