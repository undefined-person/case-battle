import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import styles from './case.module.scss'
import StarIcon from '../../shared/assets/icons/star.svg?react'
import Button from '../../shared/ui/button/button'
import Pepe from '../../shared/assets/images/prizes/pepe.png'
import Watch from '../../shared/assets/images/prizes/watch.png'
import Cap from '../../shared/assets/images/prizes/cap.png'
import Header from '../../shared/components/header/header'
import Menu from '../../shared/components/menu/menu'
import { useTranslation } from 'react-i18next'

const mockCase = {
  items: [
    { id: 896, name: 'Plush Pepe', image: Pepe, gradient: 'pepe', price: 100 },
    { id: 897, name: 'Swiss Watch', image: Watch, gradient: 'watch', price: 100 },
    { id: 898, name: "Durov's Cap", image: Cap, gradient: 'cap', price: 100 },
    { id: 111, name: 'Swiss Watch', image: Watch, gradient: 'watch', price: 100 },
    { id: 222, name: 'Plush Pepe', image: Pepe, gradient: 'pepe', price: 100 },
    { id: 33, name: "Durov's Cap", image: Cap, gradient: 'cap', price: 100 },
    { id: 44, name: 'Swiss Watch', image: Watch, gradient: 'watch', price: 100 },
    { id: 55, name: 'Plush Pepe', image: Pepe, gradient: 'pepe', price: 100 },
    { id: 66, name: "Durov's Cap", image: Cap, gradient: 'cap', price: 100 },
  ],
  prizes: [
    { id: 1, name: 'Plush Pepe', image: Pepe, stars: 400, gradient: 'pepe' },
    { id: 2, name: 'Swiss Watch', image: Watch, stars: 400, gradient: 'watch' },
    { id: 3, name: "Durov's Cap", image: Cap, stars: 400, gradient: 'cap' },
  ],
}

const totalItems = 50
const shift = 1
const itemWidthPx = 120

function getCenterX(itemWidth, index, containerWidth) {
  return -(itemWidth * index) + containerWidth / 2 - itemWidth / 2
}

const Case = () => {
  const [items, setItems] = useState([])
  const [x, setX] = useState(0)
  const [winningItem, setWinningItem] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const scrollRef = useRef(null)
  const lineRef = useRef(null)
  const markerRef = useRef(null)
  const [itemWidth, setItemWidth] = useState(itemWidthPx)
  const [rouletteKey, setRouletteKey] = useState(Date.now())
  const [shouldAnimate, setShouldAnimate] = useState(true)

  const { t } = useTranslation()

  const generateItems = () => {
    let arr = []
    for (let i = 0; i < Math.ceil(totalItems / mockCase.items.length); i++) {
      arr = arr.concat([...mockCase.items].sort(() => Math.random() - 0.5))
    }
    return arr.slice(0, totalItems)
  }

  const resetRoulette = () => {
    setShouldAnimate(false)
    setRouletteKey(Date.now())
    const newItems = generateItems()
    setItems(newItems)
    setWinningItem(null)
    setIsSpinning(false)
    setIsOpening(false)
  }

  useEffect(() => {
    resetRoulette()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    function handleResize() {
      if (scrollRef.current) {
        const width = scrollRef.current.offsetWidth
        setItemWidth(width / 3)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth
      setItemWidth(width / 3)
    }
  }, [x])

  useEffect(() => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth
      setItemWidth(width / 3)
      setX(getCenterX(width / 3, 1, width))
      setTimeout(() => setShouldAnimate(true), 0)
    }
  }, [rouletteKey])

  const extendedItems = items

  const handleOpen = () => {
    if (isSpinning || items.length !== totalItems) return
    const minIndex = Math.max(20, shift)
    const maxIndex = totalItems - shift - 1
    const randomWinIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex
    setIsSpinning(true)
    setWinningItem(null)
    setTimeout(() => {
      if (scrollRef.current) {
        setX(getCenterX(itemWidth, randomWinIndex, scrollRef.current.offsetWidth))
      }
      setTimeout(() => {
        setIsSpinning(false)
        if (lineRef.current && markerRef.current) {
          const markerRect = markerRef.current.getBoundingClientRect()
          const markerCenter = markerRect.left + markerRect.width / 2
          const cards = Array.from(lineRef.current.children)
          let minDist = Infinity
          let winner = null
          cards.forEach((el, idx) => {
            const rect = el.getBoundingClientRect()
            const cardCenter = rect.left + rect.width / 2
            const dist = Math.abs(cardCenter - markerCenter)
            if (dist < minDist) {
              minDist = dist
              winner = idx
            }
          })
          const winning = extendedItems[winner]
          setWinningItem(winning)
        }
      }, 10000)
    }, 50)
  }

  const handleInstantOpen = () => {
    setIsOpening(true)
    const randomIndex = Math.floor(Math.random() * mockCase.items.length)
    const winningItem = mockCase.items[randomIndex]
    setWinningItem(winningItem)
    setIsOpening(false)
  }

  const handleCloseWinning = () => {
    resetRoulette()
  }

  if (!items.length) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      {!winningItem && (
        <div key={rouletteKey} className={styles.roulette_wrapper}>
          <div className={styles.items_scroll} ref={scrollRef}>
            <motion.div
              key={rouletteKey}
              className={styles.items_line}
              ref={lineRef}
              initial={{ x }}
              animate={{ x }}
              transition={{ duration: shouldAnimate ? 10 : 0, ease: [0.05, 0.7, 0.1, 1] }}>
              {extendedItems.map((item, idx) => (
                <div key={idx} className={`${styles.item_card} ${styles[item.gradient]}`} style={{ width: itemWidth }}>
                  <div>
                    <div className={styles.item_name}>{item.name}</div>
                    <div className={styles.item_price}>{item.price ?? item.id}</div>
                  </div>
                  <img src={item.image} alt={item.name} className={styles.item_image} />
                </div>
              ))}
            </motion.div>
            <div className={styles.marker_container}>
              <div className={styles.marker} ref={markerRef} />
            </div>
          </div>
        </div>
      )}
      {!winningItem && (
        <div className={styles.buttons}>
          <Button onClick={handleOpen} disabled={isSpinning}>
            {t('case.open_for')} 100 <StarIcon />
          </Button>
          <Button variant="outline" onClick={handleInstantOpen} disabled={isOpening}>
            {t('case.open_instantly_for')} 100 <StarIcon />
          </Button>
        </div>
      )}
      <AnimatePresence>
        {winningItem && !isSpinning && (
          <motion.div
            className={styles.winning_popup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className={styles.winning_item_card}>
              <span className={styles.item_name}>{winningItem.name}</span>
              <img src={winningItem.image} alt={winningItem.name} className={styles.winning_item_image} />
              <div className={styles.winning_item_buttons}>
                <Button>
                  {t('inventory.sell_for')} {winningItem.price} <StarIcon />
                </Button>
                <Button className={styles.spin_again_button} onClick={handleCloseWinning}>
                  {t('case.spin_again')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.prizes_section}>
        <h2>{t('case.prizes')}</h2>
        <div className={styles.prizes_grid}>
          {mockCase.prizes.map((prize) => (
            <div key={prize.id} className={`${styles.prize_card} ${styles[prize.gradient]}`}>
              <div className={styles.prize_price}>
                <StarIcon />
                <span>{prize.stars}</span>
              </div>
              <img src={prize.image} alt="Prize" />
              <h3 className={styles.prize_name}>{prize.name}</h3>
            </div>
          ))}
        </div>
      </div>
      <Menu />
    </div>
  )
}

export default Case
