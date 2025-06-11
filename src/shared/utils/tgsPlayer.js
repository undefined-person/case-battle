import pako from 'pako'

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
      const cacheKey = `tgs-animation-${src}`
      const cached = sessionStorage.getItem(cacheKey)

      let animationData

      if (cached) {
        animationData = JSON.parse(cached)
      } else {
        const response = await fetch(src)
        const buffer = await response.arrayBuffer()

        const inflated = pako.inflate(new Uint8Array(buffer))
        const decoded = new TextDecoder().decode(inflated)
        animationData = JSON.parse(decoded)

        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(animationData))
        } catch (e) {
          console.warn('Failed to cache animation data:', e)
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
