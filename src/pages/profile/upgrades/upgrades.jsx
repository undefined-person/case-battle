import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './upgrades.module.scss'
import Card from '../../../shared/ui/card/card'
import StarIcon from '../../../shared/assets/icons/star.svg?react'
import TGSAnimation from '../../../shared/components/tgs-animation/tgs-animation'
import { gifts } from '../../../shared/constants/gifts'
import ArrowDown from '../../../shared/assets/icons/arrow-down.svg?react'

const mockUpgradeHistory = [
  {
    id: 1,
    sourceItem: gifts[1],
    targetItem: gifts[2],
    multiplier: 1.5,
    successPercentage: 66.67,
    status: 'success',
    date: '15.06.2025',
  },
  {
    id: 2,
    sourceItem: gifts[2],
    targetItem: gifts[0],
    multiplier: 2.67,
    successPercentage: 37.5,
    status: 'failed',
    date: '14.06.2025',
  },
  {
    id: 3,
    sourceItem: gifts[0],
    targetItem: gifts[3],
    multiplier: 2.5,
    successPercentage: 40,
    status: 'success',
    date: '13.06.2025',
  },
  {
    id: 4,
    sourceItem: gifts[3],
    targetItem: gifts[4],
    multiplier: 4,
    successPercentage: 25,
    status: 'failed',
    date: '12.06.2025',
  },
  {
    id: 5,
    sourceItem: gifts[4],
    targetItem: gifts[5],
    multiplier: 1.25,
    successPercentage: 80,
    status: 'success',
    date: '11.06.2025',
  },
]

export default function Upgrades() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all') // all, success, failed

  const filteredHistory = mockUpgradeHistory.filter((item) => {
    if (filter === 'all') return true
    return item.status === filter
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('upgrade.history.title', 'Upgrade History')}</h1>
      <div className={styles.filters}>
        <button
          className={`${styles.filter_button} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}>
          {t('upgrade.history.all', 'All')}
        </button>
        <button
          className={`${styles.filter_button} ${filter === 'success' ? styles.active : ''}`}
          onClick={() => setFilter('success')}>
          {t('upgrade.history.success', 'Success')}
        </button>
        <button
          className={`${styles.filter_button} ${filter === 'failed' ? styles.active : ''}`}
          onClick={() => setFilter('failed')}>
          {t('upgrade.history.failed', 'Failed')}
        </button>
      </div>
      <div className={styles.history_list}>
        {filteredHistory.map((upgrade) => (
          <Card key={upgrade.id} className={styles.history_item}>
            <div className={styles.vertical_flex}>
              <div className={styles.item}>
                <TGSAnimation
                  src={upgrade.sourceItem.image}
                  autoplay={false}
                  playonce={false}
                  playbyclick={true}
                  width={72}
                  height={72}
                />
                <div className={styles.item_info}>
                  <div className={styles.item_title}>{upgrade.sourceItem.title}</div>
                  <div className={styles.price}>
                    {upgrade.sourceItem.price} <StarIcon />
                  </div>
                </div>
              </div>
              <div className={styles.arrow_container}>
                <ArrowDown className={styles.arrow_icon} />
              </div>
              <div className={styles.upgrade_info_grouped}>
                <span className={styles.multiplier}>x{upgrade.multiplier}</span>
                <span className={styles.percentage}>{upgrade.successPercentage.toFixed(2)}%</span>
                <span className={`${styles.status_badge} ${styles[upgrade.status]}`}>
                  {upgrade.status === 'success'
                    ? t('upgrade.history.success', 'Success')
                    : t('upgrade.history.failed', 'Failed')}
                </span>
              </div>
              <div className={styles.item}>
                <TGSAnimation
                  src={upgrade.targetItem.image}
                  autoplay={false}
                  playonce={false}
                  playbyclick={true}
                  width={72}
                  height={72}
                />
                <div className={styles.item_info}>
                  <div className={styles.item_title}>{upgrade.targetItem.title}</div>
                  <div className={styles.price}>
                    {upgrade.targetItem.price} <StarIcon />
                  </div>
                </div>
              </div>
              <div className={styles.date}>{upgrade.date}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
