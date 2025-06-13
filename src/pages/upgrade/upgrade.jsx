import { useState, useMemo } from 'react'
import Button from '../../shared/ui/button/button'
import Card from '../../shared/ui/card/card'
import styles from './upgrade.module.scss'
import { useTranslation } from 'react-i18next'
import { animate } from 'motion/react'

const MULTIPLIERS = ['x1.5', 'x2', 'x3', 'x5', 'x10', 'x20']
const TICK_COUNT = 24
const percentage = 36

export default function Upgrade() {
  const { t } = useTranslation()
  const [markerAngle, setMarkerAngle] = useState(-90) // верхня точка
  const [selectedMultiplier, setSelectedMultiplier] = useState('x2')
  const [activeTab, setActiveTab] = useState('inventory')

  const radius = 95
  const innerRadius = 75
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const tickMarks = useMemo(() => {
    return Array.from({ length: TICK_COUNT }).map((_, index) => {
      const rotation = (360 / TICK_COUNT) * index
      return <div key={index} className={styles.tick_mark} style={{ transform: `rotate(${rotation}deg)` }} />
    })
  }, [])

  const cx = 110
  const cy = 110
  const markerSize = 36
  const baseAngleDeg = 8
  const baseAngle = (baseAngleDeg * Math.PI) / 180
  const rad = (markerAngle * Math.PI) / 180

  const tipX = cx + (innerRadius + markerSize / 2) * Math.cos(rad)
  const tipY = cy + (innerRadius + markerSize / 2) * Math.sin(rad)

  const base1X = cx + innerRadius * Math.cos(rad + baseAngle)
  const base1Y = cy + innerRadius * Math.sin(rad + baseAngle)
  const base2X = cx + innerRadius * Math.cos(rad - baseAngle)
  const base2Y = cy + innerRadius * Math.sin(rad - baseAngle)

  const startUpgrade = () => {
    const randomOffset = Math.random() * 360
    const targetAngle = randomOffset
    animate(markerAngle, targetAngle, {
      duration: 2,
      ease: 'easeInOut',
      onUpdate: (latest) => setMarkerAngle(latest),
    })
  }

  return (
    <div>
      <h1 className={styles.upgrade_title}>{t('upgrade.title')}</h1>
      <div className={styles.progress_container}>
        <div className={styles.progress_background} />
        <svg className={styles.progress_circle} viewBox="0 0 220 220" style={{ rotate: '90deg' }}>
          <circle className={styles.progress_circle_background} cx="110" cy="110" r={radius} />
          <circle className={styles.progress_circle_middle} cx="110" cy="110" r={innerRadius} />
          <circle
            className={styles.progress_circle_progress}
            cx="110"
            cy="110"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeWidth="16"
            transform="rotate(30 110 110)"
          />
          <polygon
            points={`
              ${tipX},${tipY}
              ${base1X},${base1Y}
              ${base2X},${base2Y}
            `}
            fill="#4ca2ff"
            filter="drop-shadow(0 0 8px #4ca2ff88)"
            stroke="#4ca2ff"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
        <div className={styles.tick_marks}>{tickMarks}</div>
        <div className={styles.progress_text}>36%</div>
      </div>
      <div>
        <h2 className={styles.multiplier_title}>{t('upgrade.progress_title')}</h2>
        <div className={styles.multiplier_container}>
          {MULTIPLIERS.map((multiplier) => (
            <button
              key={multiplier}
              className={`${styles.multiplier_button} ${selectedMultiplier === multiplier ? styles.active : ''}`}
              onClick={() => setSelectedMultiplier(multiplier)}>
              {multiplier}
            </button>
          ))}
        </div>
      </div>
      <Button className={styles.upgrade_button} onClick={startUpgrade}>
        {t('upgrade.upgrade_button')}
      </Button>
      <div className={styles.items_container}>
        <div className={styles.item_slot}>
          <div className={styles.plus_sign}>+</div>
          <div className={styles.item_slot_text}>{t('upgrade.select_item')}</div>
        </div>
        <div className={styles.item_slot}>
          <div className={styles.plus_sign}>+</div>
          <div className={styles.item_slot_text}>{t('upgrade.select_item')}</div>
        </div>
      </div>
      <div className={styles.tabs_container}>
        <button
          className={`${styles.tab} ${activeTab === 'inventory' ? styles.active : ''}`}
          onClick={() => setActiveTab('inventory')}>
          {t('upgrade.inventory')}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'gift' ? styles.active : ''}`}
          onClick={() => setActiveTab('gift')}>
          {t('upgrade.desired_gift')}
        </button>
      </div>
      <Card>
        <div className={styles.search_wrapper}>
          <input type="text" className={styles.search_input} placeholder={t('upgrade.quick_search')} />
        </div>
        <div className={styles.no_items_message}>{t('upgrade.no_items')}</div>
      </Card>
    </div>
  )
}
