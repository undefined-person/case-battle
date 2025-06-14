import { useState, useMemo, useCallback, useEffect } from 'react'
import Button from '../../shared/ui/button/button'
import Card from '../../shared/ui/card/card'
import styles from './upgrade.module.scss'
import { useTranslation } from 'react-i18next'
import { animate } from 'motion/react'
import { motion, AnimatePresence } from 'motion/react'
import { inventory as inventoryData } from '../../shared/constants/inventory'
import { gifts as giftsData } from '../../shared/constants/gifts'
import TGSAnimation from '../../shared/components/tgs-animation/tgs-animation'
import StarIcon from '../../shared/assets/icons/star.svg?react'
import { useToast } from '../../shared/ui/toast/toastContext'

const MULTIPLIERS = [1.5, 2, 3, 5, 10, 20]
const MULTIPLIERS_LABELS = MULTIPLIERS.map((x) => `x${x}`)
const TICK_COUNT = 24
const ROTATION_COUNT = 3

export default function Upgrade() {
  const { t } = useTranslation()
  const [markerAngle, setMarkerAngle] = useState(-90)
  const [selectedMultiplier, setSelectedMultiplier] = useState('x2')
  const [selectedItems, setSelectedItems] = useState([null, null])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeSlotIndex, setActiveSlotIndex] = useState(null)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [activeTab, setActiveTab] = useState('inventory')
  const [result, setResult] = useState(null)
  const [search, setSearch] = useState('')

  const radius = 95
  const innerRadius = 75
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius])

  const { showToast } = useToast()

  const getClosestMultiplier = useCallback((ratio) => {
    let closest = MULTIPLIERS[0]
    let minDiff = Math.abs(ratio - MULTIPLIERS[0])
    for (let i = 1; i < MULTIPLIERS.length; i++) {
      const diff = Math.abs(ratio - MULTIPLIERS[i])
      if (diff < minDiff) {
        minDiff = diff
        closest = MULTIPLIERS[i]
      }
    }
    return closest
  }, [])

  useEffect(() => {
    if (selectedItems[0] && selectedItems[1]) {
      const ratio = selectedItems[1].price / selectedItems[0].price
      const closest = getClosestMultiplier(ratio)
      setSelectedMultiplier(`x${closest}`)
    }
  }, [selectedItems, getClosestMultiplier])

  const handleMultiplierClick = (multiplierLabel) => {
    const multiplier = parseFloat(multiplierLabel.replace('x', ''))
    setSelectedMultiplier(multiplierLabel)
    if (selectedItems[0]) {
      const targetPrice = selectedItems[0].price * multiplier
      let closestItem = null
      let minDiff = Infinity
      for (const item of giftsData) {
        if (item.id === selectedItems[0].id) continue
        const diff = Math.abs(item.price - targetPrice)
        if (diff < minDiff) {
          minDiff = diff
          closestItem = item
        }
      }
      const tolerance = targetPrice * 0.1

      if (closestItem && minDiff <= tolerance) {
        setSelectedItems([selectedItems[0], closestItem])
      } else {
        showToast(t('upgrade.no_gift'))
      }
    }
  }

  const percentage = useMemo(() => {
    if (!selectedItems[0] || !selectedItems[1]) return 0
    const sourceItemPrice = selectedItems[0].price
    const targetItemPrice = selectedItems[1].price
    const priceRatio = sourceItemPrice / targetItemPrice
    const basePercentage = Math.min(100, Math.max(0, priceRatio * 100))
    return basePercentage
  }, [selectedItems])

  const strokeDashoffset = useMemo(() => {
    return circumference - (percentage / 100) * circumference
  }, [circumference, percentage])

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

  const tipX = useMemo(() => cx + (innerRadius + markerSize / 2) * Math.cos(rad), [cx, innerRadius, markerSize, rad])
  const tipY = useMemo(() => cy + (innerRadius + markerSize / 2) * Math.sin(rad), [cy, innerRadius, markerSize, rad])
  const base1X = useMemo(() => cx + innerRadius * Math.cos(rad + baseAngle), [cx, innerRadius, rad, baseAngle])
  const base1Y = useMemo(() => cy + innerRadius * Math.sin(rad + baseAngle), [cy, innerRadius, rad, baseAngle])
  const base2X = useMemo(() => cx + innerRadius * Math.cos(rad - baseAngle), [cx, innerRadius, rad, baseAngle])
  const base2Y = useMemo(() => cy + innerRadius * Math.sin(rad - baseAngle), [cy, innerRadius, rad, baseAngle])

  const handleItemSelect = useCallback(
    (item) => {
      const newSelectedItems = [...selectedItems]
      newSelectedItems[activeSlotIndex] = item
      setSelectedItems(newSelectedItems)
      setIsModalOpen(false)
    },
    [selectedItems, activeSlotIndex]
  )

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setActiveSlotIndex(null)
  }, [])

  const startUpgrade = () => {
    if (isUpgrading || !selectedItems[0] || !selectedItems[1]) return
    setIsUpgrading(true)
    setResult(null)
    const normalizedCurrentAngle = ((markerAngle % 360) + 360) % 360
    const randomAngle = Math.random() * 360
    const targetAngle = normalizedCurrentAngle + 360 * ROTATION_COUNT + randomAngle
    animate(markerAngle, targetAngle, {
      duration: 8,
      ease: (t) => {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      },
      onUpdate: (latest) => {
        const newAngle = latest % 360
        setMarkerAngle(newAngle)
      },
      onComplete: () => {
        setIsUpgrading(false)
        const winSector = percentage * 3.6
        let pointer = (360 - (((markerAngle % 360) + 360) % 360)) % 360
        pointer = (pointer - 30 + 360) % 360
        let inWin
        if (winSector === 0) {
          inWin = false
        } else if (winSector >= 360) {
          inWin = true
        } else {
          inWin = pointer >= 0 && pointer < winSector
        }

        setResult(inWin ? 'win' : 'lose')
      },
    })
  }

  const filteredItems = useMemo(() => {
    return activeTab === 'inventory'
      ? inventoryData.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      : giftsData.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
  }, [search, activeTab])

  const handleGridItemClick = useCallback(
    (item) => {
      const newSelectedItems = [...selectedItems]
      newSelectedItems[activeTab === 'inventory' ? 0 : 1] = item
      setSelectedItems(newSelectedItems)
    },
    [selectedItems, activeTab]
  )

  function hasValidGiftForMultiplier(multiplier) {
    if (!selectedItems[0]) return false
    const targetPrice = selectedItems[0].price * multiplier
    return giftsData.some(
      (item) => item.id !== selectedItems[0].id && Math.abs(item.price - targetPrice) <= targetPrice * 0.1
    )
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
        <div className={styles.progress_text}>
          {!selectedItems[0] || !selectedItems[1]
            ? null
            : result === 'win'
            ? t('upgrade.win')
            : result === 'lose'
            ? t('upgrade.lose')
            : `${percentage.toFixed(2)}%`}
        </div>
      </div>
      <div>
        <h2 className={styles.multiplier_title}>{t('upgrade.progress_title')}</h2>
        <div className={styles.multiplier_container}>
          {MULTIPLIERS_LABELS.map((multiplierLabel) => {
            const multiplier = parseFloat(multiplierLabel.replace('x', ''))
            const valid = hasValidGiftForMultiplier(multiplier)
            const isActive = selectedMultiplier === multiplierLabel && valid
            return (
              <button
                key={multiplierLabel}
                className={`${styles.multiplier_button} ${isActive ? styles.active : ''}`}
                onClick={() => handleMultiplierClick(multiplierLabel)}>
                {multiplierLabel}
              </button>
            )
          })}
        </div>
      </div>
      <Button
        className={styles.upgrade_button}
        onClick={startUpgrade}
        disabled={isUpgrading || !selectedItems[0] || !selectedItems[1]}>
        {isUpgrading ? t('upgrade.spinning') : t('upgrade.upgrade_button')}
      </Button>
      <div className={styles.items_container}>
        {selectedItems.map((item, index) => (
          <div key={index} className={styles.item_slot}>
            {item ? (
              <>
                <TGSAnimation src={item.image} autoplay={true} playonce={false} playbyclick={true} />
                <div className={styles.item_slot_text}>{item.title}</div>
              </>
            ) : (
              <>
                <div className={styles.plus_sign}>+</div>
                <div className={styles.item_slot_text}>{t('upgrade.select_item')}</div>
              </>
            )}
          </div>
        ))}
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
          <input
            type="text"
            className={styles.search_input}
            placeholder={t('upgrade.quick_search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.inventory_grid}>
          {filteredItems.length === 0 ? (
            <div className={styles.no_items_message}>{t('upgrade.no_items')}</div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className={styles.inventory_item} onClick={() => handleGridItemClick(item)}>
                <TGSAnimation
                  src={item.image}
                  autoplay={false}
                  playonce={false}
                  playbyclick={true}
                  width={90}
                  height={90}
                />
                <h3 className={styles.inventory_item_title}>{item.title}</h3>
                <div className={styles.inventory_item_price}>
                  {item.price} <StarIcon />
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={styles.winning_popup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className={styles.winning_item_card}>
              <h2>{t('upgrade.select_item')}</h2>
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
              <div className={styles.inventory_grid}>
                {(activeTab === 'inventory' ? inventoryData : giftsData).map((item) => (
                  <div key={item.id} className={styles.inventory_item} onClick={() => handleItemSelect(item)}>
                    <TGSAnimation
                      src={item.image}
                      autoplay={false}
                      playonce={false}
                      playbyclick={true}
                      width={90}
                      height={90}
                    />
                    <h3 className={styles.inventory_item_title}>{item.title}</h3>
                    <div className={styles.inventory_item_price}>
                      {item.price} <StarIcon />
                    </div>
                  </div>
                ))}
              </div>
              <Button className={styles.spin_again_button} onClick={handleCloseModal}>
                {t('case.close')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
