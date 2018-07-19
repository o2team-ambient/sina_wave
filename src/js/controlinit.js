/*
 * @desc 控制面板初始化代码
 * 注：控制面板自定义代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName, getRandom, getRandomArr } from './utils/util'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor () {
      this.message = '正弦波浪'
      this.backgroundColor = '#bddaf7'
      this.play = () => {
        if (!window[O2_AMBIENT_MAIN] || !window[O2_AMBIENT_MAIN].toggle || typeof window[O2_AMBIENT_MAIN].toggle !== 'function') return
        window[O2_AMBIENT_MAIN].toggle()
      }
    }
  }

  // 主控制面板
  class Control extends Controller {
    constructor () {
      super()
      this.waveCount = -1
      this.wavesControl = {}
      this.controls = {}
      this.otherConfig = new OtherConfig()

      this.initBaseGUI()
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI() {
      // demo code
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI()
      gui.addCallbackFunc(this.resetCanvas.bind(this))
      config.random = () => {
        this.randomData()
      }
      config.addWave = () => {
        this.addWaveFolder()
      }
      gui.add(otherConfig, 'message').name('配置面板')
      gui.add(otherConfig, 'play').name('播放 / 暂停')
      gui.add(config, 'width').name('粒子散播宽度').onFinishChange(val => {
        window[O2_AMBIENT_MAIN].update(config)
      })
      gui.add(config, 'height').name('粒子散播高度').onFinishChange(val => {
        window[O2_AMBIENT_MAIN].update(config)
      })
      this.controls['speed'] = gui.add(config, 'speed', 1, 20).name('波浪速度').onFinishChange(val => {
        window[O2_AMBIENT_MAIN].update(config)
      })
      this.controls['rotate'] = gui.add(config, 'rotate', 0, 360).name('旋转角度').onFinishChange(val => {
        window[O2_AMBIENT_MAIN].update(config)
      })
      this.controls['ease'] = gui.add(config, 'ease', ['Linear', 'SineIn', 'SineOut', 'SineInOut']).name('缓动函数').onFinishChange(val => {
        window[O2_AMBIENT_MAIN].update(config)
      })
      this.controls['waveWidth'] = gui.add(config, 'waveWidth', 1, 100).name('波浪宽度').onFinishChange(val => {
        window[O2_AMBIENT_MAIN].update(config)
      })
      gui.add(config, 'random').name('随机配置')
      gui.add(config, 'addWave').name('增加波浪')

      this.isShowController && !this.isAmbientPlat && gui.addColor(otherConfig, 'backgroundColor').name('背景色(仅演示)').onFinishChange(val => {
        this.setBackgroundColor(val)
      })
      this.gui = gui
      // 设置控制面板层级
      this.setGUIzIndex(2)
    }

    addWaveFolder(isInit) {
      this.waveCount++
      this.wavesControl[this.waveCount] = {}
      const wavesFolder = this.gui.addFolder(`波浪${this.waveCount + 1}`)
      let wavesConfig
      if (isInit) {
        wavesConfig = Object.assign({}, this.config.waves[this.waveCount])
      } else {
        wavesConfig = {
          timeModifier: getRandom(1, 5),   // This is multiplied againse `speed`
          lineWidth: getRandom(1, 5),      // Stroke width
          amplitude: getRandom(1, 300),    // How tall is the wave
          wavelength: getRandom(1, 300),   // How long is the wave
          segmentLength: getRandom(1, 50), // How smooth should the line be
          strokeStyle: 'rgba(0, 0, 0, 0.5)', // Stroke color and opacity
          type: getRandomArr(['sine', 'sign', 'square', 'sawtooth', 'triangle'])       // Wave type
        }
      }
      this.config.waves[this.waveCount] = wavesConfig

      Object.keys(wavesConfig).forEach((key) => {
        let wavesController
        if (key === 'strokeStyle') {
          wavesController = wavesFolder.addColor(wavesConfig, key).name(`${key}`)
        } else if (key === 'type') {
          wavesController = wavesFolder.add(wavesConfig, key, ['sine', 'sign', 'square', 'sawtooth', 'triangle']).name(`${key}`)
        } else if (key !== 'waveFn') {
          wavesController = wavesFolder.add(wavesConfig, key).name(`${key}`)
        }
        const idx = this.waveCount
        if (wavesController) {
          wavesController.onFinishChange(val => {
            const newOptions = Object.assign({}, this.config)
            newOptions.waves[idx][key] = val
            this.resetAmbient(newOptions)
          })
          this.wavesControl[idx][key] = wavesController
        }
      })

      wavesConfig.random = this.randomWave.bind(this, this.waveCount)
      wavesFolder.add(wavesConfig, 'random').name('随机配置')

      window[O2_AMBIENT_MAIN].update(this.config)
    }

    randomData() {
      const controllerMap = this.controls
      controllerMap['speed'].setValue(getRandom(1, 20))
      controllerMap['rotate'].setValue(getRandom(0, 360))
      controllerMap['waveWidth'].setValue(getRandom(1, 100))
      controllerMap['ease'].setValue(getRandomArr(['Linear', 'SineIn', 'SineOut', 'SineInOut']))
    }

    randomWave(key) {
      console.log(key, this.wavesControl)
      const controllerMap = this.wavesControl[key]
      controllerMap['timeModifier'].setValue(getRandom(1, 5))
      controllerMap['lineWidth'].setValue(getRandom(1, 5))
      controllerMap['amplitude'].setValue(getRandom(1, 300))
      controllerMap['wavelength'].setValue(getRandom(1, 300))
      controllerMap['segmentLength'].setValue(getRandom(1, 50))
      controllerMap['type'].setValue(getRandomArr(['sine', 'sign', 'square', 'sawtooth', 'triangle']))
    }
  }

  /* eslint-disable no-new */
  new Control()
}

export default controlInit
