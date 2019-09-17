import sinewaves from 'sine-waves'

class SineWaves {
  constructor (el, opts) {
    this.el = el
    this.opts = opts
    this.isPlay = false
    let realWidth = document.documentElement.clientWidth
    let realHeight = document.documentElement.clientHeight
    let canvasWidth = opts.width
    let canvasHeight = opts.Height
    if (realWidth < opts.width) {
      canvasWidth = realWidth
    }
    if (realHeight < opts.height) {
      canvasHeight = realHeight
    }
    this.width = canvasWidth
    this.height = canvasHeight

    this.init()
  }

  init () {
    const {
      speed,
      rotate,
      ease,
      wavesWidth,
      waves,
      initialize,
      resizeEvent,
    } = this.opts

    this.el.style.width = `${this.width}px`
    this.el.style.height = `${this.height}px`
    this.isPlay = true

    let extendsObj = {}
    if (initialize) {
      extendsObj.initialize = () => {
        typeof initialize === 'function' && initialize()
        if (typeof initialize === 'string') {
          try {
            eval(`(${decodeURI(initialize)})()`)
          } catch(e) {}
        }
      }
    }

    if (resizeEvent) {
      extendsObj.resizeEvent = () => {
        typeof resizeEvent === 'function' && resizeEvent()
        if (typeof resizeEvent === 'string') {
          try {
            eval(`(${decodeURI(resizeEvent)})()`)
          } catch(e) {}
        }
      }
    }
  
    this.waves = new sinewaves({
      // Canvas Element
      el: this.el,

      width: this.width,

      height: this.height,

      // General speed of entire wave system
      speed,

      // How many degress should we rotate all of the waves
      rotate,

      // Ease function from left to right
      ease,

      // Specific how much the width of the canvas the waves should be
      // This can either be a number or a percent
      wavesWidth: `${wavesWidth}%`,

      // An array of wave options
      waves
    })
  }

  reset (newOptions) {
    this.waves.running = false
    this.opts = newOptions
    let realWidth = document.documentElement.clientWidth
    let realHeight = document.documentElement.clientHeight
    let canvasWidth = newOptions.width
    let canvasHeight = newOptions.height
    if (realWidth < newOptions.width) {
      canvasWidth = realWidth
    }
    if (realHeight < newOptions.height) {
      canvasHeight = realHeight
    }
    this.width = canvasWidth
    this.height = canvasHeight
    this.waves = null
    this.init()
  }

  pause () {
    this.isPlay = false
    this.waves.running = false
  }

  replay () {
    this.isPlay = true
    this.waves.running = true
  }

  destroy () {
    this.waves.running = false
    this.waves = null
    this.opts.el.remove()
  }

  toggle () {
    this.isPlay ? this.pause() : this.replay()
  }
}

export default SineWaves
