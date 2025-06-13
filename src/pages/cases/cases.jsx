import styles from './cases.module.scss'
import { cases } from '../../shared/constants/cases'
import Card from '../../shared/ui/card/card'
import StarIcon from '../../shared/assets/icons/star.svg?react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export default function Cases() {
  const { t } = useTranslation()
  return (
    <div className={styles.cases_container}>
      <div className={styles.tabs}>
        <button className={styles.tab}>{t('cases.filters.filter_1')}</button>
        <button className={styles.tab}>{t('cases.filters.filter_2')}</button>
        <button className={styles.tab}>{t('cases.filters.filter_3')}</button>
      </div>
      <div className={styles.cases}>
        {cases.map((item) => (
          <Link to={`/case/${item.id}`} key={item.id} className={styles.case_link}>
            <Card className={styles.case}>
              <img src={item.image} alt={item.title} className={styles.case_image} />
              <h3 className={styles.case_title}>{item.title}</h3>
              <div className={styles.case_price}>
                <StarIcon className={styles.case_star} />
                <span>{item.price}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
