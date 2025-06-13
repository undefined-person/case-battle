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

const mockCase = {
  items: [
    { id: 896, name: 'Plush Pepe', image: Pepe, gradient: 'pepe' },
    { id: 897, name: 'Swiss Watch', image: Watch, gradient: 'watch' },
    { id: 898, name: "Durov's Cap", image: Cap, gradient: 'cap' },
    { id: 111, name: 'Swiss Watch', image: Watch, gradient: 'watch' },
    { id: 222, name: 'Plush Pepe', image: Pepe, gradient: 'pepe' },
    { id: 33, name: "Durov's Cap", image: Cap, gradient: 'cap' },
    { id: 44, name: 'Swiss Watch', image: Watch, gradient: 'watch' },
    { id: 55, name: 'Plush Pepe', image: Pepe, gradient: 'pepe' },
    { id: 66, name: "Durov's Cap", image: Cap, gradient: 'cap' },
  ],
  prizes: [
    { id: 1, name: 'Plush Pepe', image: Pepe, stars: 400, gradient: 'pepe' },
    { id: 2, name: 'Swiss Watch', image: Watch, stars: 400, gradient: 'watch' },
    { id: 3, name: "Durov's Cap", image: Cap, stars: 400, gradient: 'cap' },
  ],
}

const totalItems = 50
const visibleCount = 21
const shift = Math.floor(visibleCount / 2)
const gapPx = 8
const clones = 2
const itemWidthPx = 120

function getInitialX(itemWidth, gapPx, clones, paddingOffset) {
  return -((itemWidth + gapPx) * clones) + paddingOffset
}

const Case = () => {
  const [items, setItems] = useState([])
  const [x, setX] = useState(0)
  const [winningItem, setWinningItem] = useState(null)
  const [showRestart, setShowRestart] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const scrollRef = useRef(null)
  const lineRef = useRef(null)
  const markerRef = useRef(null)
  const [itemWidth, setItemWidth] = useState(itemWidthPx)
  const [paddingOffset, setPaddingOffset] = useState(0)

  const generateItems = () => {
    let arr = []
    for (let i = 0; i < Math.ceil(totalItems / mockCase.items.length); i++) {
      arr = arr.concat([...mockCase.items].sort(() => Math.random() - 0.5))
    }
    return arr.slice(0, totalItems)
  }

  useEffect(() => {
    setItems(generateItems())
    setWinningItem(null)
    setIsSpinning(false)
    setIsOpening(false)
    if (scrollRef.current) {
      setItemWidth(scrollRef.current.offsetWidth / 3)
      setPaddingOffset(scrollRef.current.offsetWidth * 0.16665)
    }
    setX(getInitialX(itemWidth, gapPx, clones, paddingOffset))
    // eslint-disable-next-line
  }, [showRestart])

  const extendedItems = [...items.slice(-clones), ...items, ...items.slice(0, clones)]

  const handleOpen = () => {
    if (isSpinning || items.length !== totalItems) return
    const minIndex = Math.max(15, shift)
    const maxIndex = totalItems - shift - 1
    const randomWinIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex
    setIsSpinning(true)
    setWinningItem(null)
    setTimeout(() => {
      setX(-((itemWidth + gapPx) * randomWinIndex) + paddingOffset)
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
      }, 6000)
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
    setWinningItem(null)
    setShowRestart(true)
  }

  const handleRestart = () => {
    setShowRestart(false)
  }

  if (!items.length) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      {!winningItem && !showRestart && (
        <div className={styles.roulette_wrapper}>
          <div className={styles.items_scroll} ref={scrollRef}>
            <motion.div
              className={styles.items_line}
              ref={lineRef}
              initial={false}
              animate={{ x }}
              transition={{ duration: 6, ease: [0.22, 1, 0.36, 1] }}>
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
      {!winningItem && !showRestart && (
        <div className={styles.buttons}>
          <Button onClick={handleOpen} disabled={isSpinning}>
            Открыть за 100 <StarIcon />
          </Button>
          <Button variant="outline" onClick={handleInstantOpen} disabled={isOpening}>
            Открыть моментально за 100 <StarIcon />
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
            <div className={`${styles.item_card} ${styles[winningItem.gradient]}`}>
              <span className={styles.item_name}>{winningItem.name}</span>
              <img src={winningItem.image} alt={winningItem.name} />
              <div className={styles.item_price}>
                <StarIcon />
                <span>{winningItem.price ?? winningItem.id}</span>
              </div>
            </div>
            <button onClick={handleCloseWinning}>Закрыть</button>
          </motion.div>
        )}
      </AnimatePresence>
      {showRestart && !winningItem && (
        <>
          <div className={styles.buttons}>
            <Button onClick={handleRestart}>Открыть ещё раз</Button>
          </div>
        </>
      )}
      <div className={styles.prizes_section}>
        <h2>Призы</h2>
        <div className={styles.prizes_grid}>
          {mockCase.prizes.map((prize) => (
            <div key={prize.id} className={`${styles.prize_card} ${styles[prize.gradient]}`}>
              <img src={prize.image} alt="Prize" />
              <div className={styles.prize_stars}>
                <StarIcon />
                <span>{prize.stars}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Menu />
    </div>
  )
}

export default Case
