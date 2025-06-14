import pako from 'pako'

const CACHE_PREFIX = 'tgs-animation-'
const CACHE_VERSION = '1.0'
const MAX_CACHE_SIZE = 50

export class TgsPlayer {
  constructor(container, options = {}) {
    this.container = container
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
    })
    this.options = options

    this.canvas.width = options.width || 114
    this.canvas.height = options.height || 114

    this.ctx.imageSmoothingEnabled = true
    this.ctx.imageSmoothingQuality = 'low'

    container.appendChild(this.canvas)
  }

  async loadAnimation(src) {
    try {
      const cacheKey = `${CACHE_PREFIX}${CACHE_VERSION}-${src}`
      const cached = sessionStorage.getItem(cacheKey)

      let animationData

      if (cached) {
        try {
          animationData = JSON.parse(cached)
        } catch (e) {
          console.warn('Failed to parse cached animation data:', e)
          sessionStorage.removeItem(cacheKey)
        }
      }

      if (!animationData) {
        const response = await fetch(src)
        if (!response.ok) {
          throw new Error(`Failed to fetch animation: ${response.statusText}`)
        }

        const buffer = await response.arrayBuffer()
        const inflated = pako.inflate(new Uint8Array(buffer))
        const decoded = new TextDecoder().decode(inflated)
        animationData = JSON.parse(decoded)

        if (animationData) {
          try {
            // Clean up old cache entries if we're at the limit
            const keys = Object.keys(sessionStorage)
            const tgsKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX))
            if (tgsKeys.length >= MAX_CACHE_SIZE) {
              const oldestKey = tgsKeys[0]
              sessionStorage.removeItem(oldestKey)
            }

            sessionStorage.setItem(cacheKey, JSON.stringify(animationData))
          } catch (e) {
            console.warn('Failed to cache animation data:', e)
            // If we hit storage limits, clear some old entries
            const keys = Object.keys(sessionStorage)
            const tgsKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX))
            if (tgsKeys.length > 0) {
              sessionStorage.removeItem(tgsKeys[0])
              try {
                sessionStorage.setItem(cacheKey, JSON.stringify(animationData))
              } catch (e2) {
                console.warn('Failed to cache animation data after cleanup:', e2)
              }
            }
          }
        }
      }

      if (animationData) {
        animationData.tgs = 1
        animationData.v = '5.5.2'
        animationData.assets = animationData.assets || []
        animationData.ip = 0
        animationData.op = animationData.op || 60
        animationData.fr = 30
        animationData.ddd = 0
        animationData.sr = 1
        animationData.xt = 0
        animationData.markers = []
      }

      return animationData
    } catch (error) {
      console.error('Error loading TGS animation:', error)
      return null
    }
  }

  destroy() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx = null
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
      this.canvas = null
    }

    this.container = null
  }
}
