import { useEffect, useRef, useCallback } from 'react'
import lottie from 'lottie-web'
import { TgsPlayer } from '../../utils/tgsPlayer'
import styles from './tgs-animation.module.scss'

let activeAnimations = 0

export default function TGSAnimation({
  src,
  width = 114,
  height = 114,
  autoplay = true,
  playonce = false,
  playbyclick = false,
}) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const animationRef = useRef(null)

  const handleClick = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.goToAndPlay(0)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let isDestroyed = false

    const loadAnimation = async () => {
      try {
        if (playerRef.current) {
          playerRef.current.destroy()
          playerRef.current = null
        }
        if (animationRef.current) {
          animationRef.current.destroy()
          animationRef.current = null
          activeAnimations = Math.max(0, activeAnimations - 1)
        }

        const existingCanvas = container.querySelector('canvas')
        if (existingCanvas) {
          const ctx = existingCanvas.getContext('2d')
          ctx?.clearRect(0, 0, existingCanvas.width, existingCanvas.height)
        }

        if (isDestroyed) return

        playerRef.current = new TgsPlayer(container, { width, height })

        const animationData = await playerRef.current.loadAnimation(src)

        if (animationData && containerRef.current && !isDestroyed) {
          lottie.setQuality(2)

          activeAnimations++
          animationRef.current = lottie.loadAnimation({
            container: container,
            renderer: 'canvas',
            loop: !playonce,
            autoplay: autoplay,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid meet',
              clearCanvas: true,
              className: 'lottie-canvas',
              progressiveLoad: false,
            },
          })

          if (animationRef.current) {
            animationRef.current.setSubframe(false)

            const totalFrames = animationRef.current.totalFrames
            if (totalFrames > 60) {
              animationRef.current.setSpeed(1.25)
            }

            if (playonce) {
              animationRef.current.addEventListener('complete', () => {
                if (animationRef.current && !isDestroyed) {
                  animationRef.current.pause()
                }
              })
            }

            // Add periodic cleanup for long-running animations
            if (!playonce) {
              const cleanupInterval = setInterval(() => {
                if (animationRef.current && !document.hidden && !isDestroyed) {
                  animationRef.current.goToAndPlay(0, true)
                }
              }, 60000)

              return () => clearInterval(cleanupInterval)
            }
          }

          if (playbyclick) {
            container.addEventListener('click', handleClick)
          }
        }
      } catch (error) {
        console.error('Error loading TGS animation:', error)
        activeAnimations = Math.max(0, activeAnimations - 1)
      }
    }

    loadAnimation()

    return () => {
      isDestroyed = true

      if (playbyclick) {
        container.removeEventListener('click', handleClick)
      }

      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
      if (animationRef.current) {
        animationRef.current.destroy()
        animationRef.current = null
        activeAnimations = Math.max(0, activeAnimations - 1)
      }

      const existingCanvas = container.querySelector('canvas')
      if (existingCanvas) {
        const ctx = existingCanvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, existingCanvas.width, existingCanvas.height)
        }
      }
    }
  }, [src, width, height, autoplay, playonce, playbyclick, handleClick])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && animationRef.current) {
        animationRef.current.pause()
      } else if (!document.hidden && animationRef.current && autoplay) {
        animationRef.current.play()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [autoplay])

  return (
    <div
      ref={containerRef}
      className={`${styles.tgs_container} ${playbyclick ? styles.clickable : ''}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        willChange: 'transform',
      }}
    />
  )
}
