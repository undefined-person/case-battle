import { useState, useMemo } from 'react'
import Header from '../../shared/components/header/header'
import Button from '../../shared/ui/button/button'
import Card from '../../shared/ui/card/card'
import styles from './upgrade.module.scss'

const MULTIPLIERS = ['x1.5', 'x2', 'x3', 'x5', 'x10', 'x20']
const TICK_COUNT = 24

export default function Upgrade() {
  const [progress] = useState(36)
  const [selectedMultiplier, setSelectedMultiplier] = useState('x2')
  const [activeTab, setActiveTab] = useState('inventory')

  const radius = 95
  const innerRadius = 75
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const tickMarks = useMemo(() => {
    return Array.from({ length: TICK_COUNT }).map((_, index) => {
      const rotation = (360 / TICK_COUNT) * index
      return <div key={index} className={styles.tick_mark} style={{ transform: `rotate(${rotation}deg)` }} />
    })
  }, [])

  return (
    <div>
      <Header />
      <h1 className={styles.upgrade_title}>Апгрейд NFT</h1>
      <div className={styles.progress_container}>
        <div className={styles.progress_background} />
        <div className={styles.marker} />
        <div className={styles.tick_marks}>{tickMarks}</div>
        <svg className={styles.progress_circle} viewBox="0 0 220 220">
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
          />
        </svg>
        <div className={styles.progress_text}>{progress}%</div>
      </div>
      <div>
        <h2 className={styles.multiplier_title}>Выберите подарок для улучшения</h2>
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
      <Button className={styles.upgrade_button}>Улучшить</Button>
      <div className={styles.items_container}>
        <div className={styles.item_slot}>
          <div className={styles.plus_sign}>+</div>
          <div className={styles.item_slot_text}>Выберите ваш предмет</div>
        </div>
        <div className={styles.item_slot}>
          <div className={styles.plus_sign}>+</div>
          <div className={styles.item_slot_text}>Выберите ваш предмет</div>
        </div>
      </div>
      <div className={styles.tabs_container}>
        <button
          className={`${styles.tab} ${activeTab === 'inventory' ? styles.active : ''}`}
          onClick={() => setActiveTab('inventory')}>
          ИНВЕНТАРЬ
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'gift' ? styles.active : ''}`}
          onClick={() => setActiveTab('gift')}>
          ЖЕЛАЕМЫЙ GIFT
        </button>
      </div>
      <Card>
        <div className={styles.search_wrapper}>
          <input type="text" className={styles.search_input} placeholder="Быстрый поиск" />
        </div>
        <div className={styles.no_items_message}>В вашем инвентаре нет предметов стоимостью выше 100 Stars</div>
      </Card>
    </div>
  )
}
