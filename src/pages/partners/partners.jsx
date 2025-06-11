import StarIcon from '../../shared/assets/icons/star.svg?react'
import CopyIcon from '../../shared/assets/icons/copy.svg?react'
import TicketIcon from '../../shared/assets/icons/ticket.svg?react'
import Button from '../../shared/ui/button/button'
import Card from '../../shared/ui/card/card'

import styles from './partners.module.scss'
import { partners } from '../../shared/constants/partners'
import { useTranslation } from 'react-i18next'

export default function Partners() {
  const { t } = useTranslation()
  return (
    <div>
      <div className={styles.partners_container}>
        <p className={styles.partners_title}>{t('partners.invite_title')}</p>
        <div className={styles.partners_info}>
          {t('partners.invite_info')} <StarIcon />
        </div>
        <div className={styles.partners_buttons_container}>
          <Button className={styles.partners_button}>{t('partners.invite_button')}</Button>
          <Button className={styles.partners_button}>
            <CopyIcon />
          </Button>
        </div>
        <Button className={styles.partners_button}>
          {t('partners.promo_code_button')}
          <TicketIcon />
        </Button>
      </div>
      <Card className={styles.partners_card}>
        <h2 className={styles.partners_card_title}>{t('partners.invited_friends')}</h2>
        <p className={styles.partners_card_info}>{t('partners.promo_code_info')}</p>
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
  const { t } = useTranslation()
  return (
    <div className={styles.partners_item}>
      <img src={image} alt={name} />
      <p className={styles.partners_item_name}>{name}</p>
      <p className={styles.partners_item_status}>{t(status)}</p>
    </div>
  )
}
