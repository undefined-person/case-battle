import BackBtn from '../../shared/components/back-btn/back-btn'
import { useNavigate } from 'react-router'
import styles from './history.module.scss'
import { history } from '../../shared/constants/history'
import { useTranslation } from 'react-i18next'

export default function History() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div>
      <div className={styles.header_container}>
        <BackBtn className={styles.back_btn} onClick={() => navigate(-1)} />
        <h1>{t('history.title')}</h1>
      </div>
      <div className={styles.history_table}>
        <div className={styles.history_table_header}>
          <span>ID/Provider</span>
          <span>Amount</span>
          <span>Data/Status</span>
        </div>
        <div>
          {history.map((item) => (
            <div key={item.id} className={styles.history_item}>
              <div>
                <h4>{item.id}</h4>
                <h4>{item.provider}</h4>
              </div>
              <div>{item.price}</div>
              <div>
                <h4>{item.date}</h4>
                <h4 className={`${styles.history_item_status} ${styles[item.status]}`}>
                  {t(`history.${item.status}`)}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
