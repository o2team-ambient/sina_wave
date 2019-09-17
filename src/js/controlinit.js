/*
 * @desc 控制面板初始化代码
 * 注：控制面板自定义代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_CLASSNAME,
  waveConfigKeys
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName, getRandom, getRandomArr } from './utils/util'
import processLocalConfig from './utils/processLocalConfig'

import configKeys from './configs/keys'
import demo1 from './configs/demo1'
import demo2 from './configs/demo2'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')
const configKeyVal = getParameterByName('configKey')
const configKey = configKeys[configKeyVal] || configKeys['default']

let controlInit = () => {
  const loadData = {
    '默认': {
      '0': { ...window[O2_AMBIENT_CONFIG] }
    },
    '示例1': {
      '0': { ...window[O2_AMBIENT_CONFIG], ...demo1 }
    },
    '示例2': {
      '0': { ...window[O2_AMBIENT_CONFIG], ...demo2 }
    }
  }
  const allLoadData = processLocalConfig({ configKey, guiName: O2_AMBIENT_CLASSNAME, loadData })

  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor () {
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
      this.wavesFolder = {}
      this.otherConfig = new OtherConfig()

      this.initBaseGUI()
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI () {
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI({
        name: O2_AMBIENT_CLASSNAME,
        preset: configKey,
        load: {
          'remembered': { ...allLoadData.remembered }
        }
      })
      // gui.remember(config)
      gui.addCallbackFunc(this.resetCanvas.bind(this))

      otherConfig.random = () => {
        this.randomData()
      }
      otherConfig.addWave = () => {
        this.addWaveFolder()
      }
      otherConfig.removeWave = () => {
        this.removeWaveFolder()
      }

      gui.add(otherConfig, 'play').name('播放 / 暂停')
      gui.add(config, 'width').name('画布宽度')
      gui.add(config, 'height').name('画布高度')
      this.controls['speed'] = gui.add(config, 'speed', 1, 20).name('波浪速度')
      this.controls['rotate'] = gui.add(config, 'rotate', 0, 360).name('旋转角度')
      this.controls['ease'] = gui
        .add(config, 'ease', ['Linear', 'SineIn', 'SineOut', 'SineInOut'])
        .name('缓动函数')
        .onFinishChange(() => {
          this.resetCanvas()
        })
      this.controls['wavesWidth'] = gui.add(config, 'wavesWidth', 1, 100).name('波浪占比')
      gui.add(otherConfig, 'random').name('随机配置')
      gui.add(otherConfig, 'addWave').name('增加波浪')
      gui.add(otherConfig, 'removeWave').name('删减波浪')

      this.isShowController && !this.isAmbientPlat && gui.addColor(otherConfig, 'backgroundColor').name('背景色(仅演示)').onFinishChange(val => {
        this.setBackgroundColor(val)
      })
      this.gui = gui

      config.waves.forEach(() => {
        this.addWaveFolder(true)
      })

      // 设置控制面板层级
      this.setGUIzIndex(2)

      // setTimeout(() => {
      //   this.resetCanvas()
      // }, 500)
    }

    addWaveFolder (isInit) {
      this.waveCount++
      this.wavesControl[this.waveCount] = {}

      const idx = this.waveCount
      const wavesFolder = this.gui.addFolder(`波浪${this.waveCount + 1}`)
      let wavesConfig

      if (isInit) {
        wavesConfig = Object.assign({}, this.config.waves[this.waveCount])
      } else {
        wavesConfig = {
          timeModifier: getRandom(1, 5), // This is multiplied againse `speed`
          lineWidth: getRandom(1, 5), // Stroke width
          amplitude: getRandom(1, 300), // How tall is the wave
          wavelength: getRandom(1, 300), // How long is the wave
          segmentLength: getRandom(1, 50), // How smooth should the line be
          strokeStyle: `rgba(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 10) / 10})`, // Stroke color and opacity
          type: getRandomArr(['sine', 'sign', 'square', 'sawtooth', 'triangle']) // Wave type
        }
      }

      this.otherConfig.play()
      this.config.waves[this.waveCount] = wavesConfig
      this.resetCanvas()

      Object.keys(wavesConfig).forEach((key) => {
        let wavesController

        if (key === 'strokeStyle') {
          wavesController = wavesFolder.addColor(wavesConfig, key).name(waveConfigKeys[key])
        } else if (key === 'type') {
          wavesController = wavesFolder
            .add(wavesConfig, key, ['sine', 'sign', 'square', 'sawtooth', 'triangle'])
            .name(waveConfigKeys[key])
            .onFinishChange(val => {
              this.config.waves[idx][key] = val
              this.resetCanvas()
            })
        } else if (key !== 'waveFn') {
          wavesController = wavesFolder.add(wavesConfig, key).name(waveConfigKeys[key])
        }

        if (wavesController) {
          wavesController.onFinishChange(val => {
            // const newOptions = Object.assign({}, this.config)
            this.config.waves[idx][key] = val
            this.resetCanvas()
          })
          this.wavesControl[idx][key] = wavesController
        }
      })

      wavesConfig.random = this.randomWave.bind(this, this.waveCount)
      wavesFolder.add(wavesConfig, 'random').name('随机配置')
      this.wavesFolder[idx] = wavesFolder
    }

    removeWaveFolder () {
      if (!this.config.waves.length) return
      this.waveCount--
      this.config.waves.pop()
      this.resetCanvas()
      this.gui.removeFolder(this.wavesFolder[this.config.waves.length])
    }

    randomData () {
      const controllerMap = this.controls
      controllerMap['speed'].setValue(getRandom(1, 20))
      controllerMap['rotate'].setValue(getRandom(0, 360))
      controllerMap['wavesWidth'].setValue(getRandom(1, 100))
      controllerMap['ease'].setValue(getRandomArr(['Linear', 'SineIn', 'SineOut', 'SineInOut']))
    }

    randomWave (key) {
      const controllerMap = this.wavesControl[key]

      controllerMap['timeModifier'] && controllerMap['timeModifier'].setValue(getRandom(1, 5))
      controllerMap['lineWidth'] && controllerMap['lineWidth'].setValue(getRandom(1, 5))
      controllerMap['amplitude'] && controllerMap['amplitude'].setValue(getRandom(1, 300))
      controllerMap['wavelength'] && controllerMap['wavelength'].setValue(getRandom(1, 300))
      controllerMap['segmentLength'] && controllerMap['segmentLength'].setValue(getRandom(1, 50))
      controllerMap['strokeStyle'] && controllerMap['strokeStyle'].setValue(`rgba(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 10) / 10})`)
      controllerMap['type'] && controllerMap['type'].setValue(getRandomArr(['sine', 'sign', 'square', 'sawtooth', 'triangle']))
    }
  }

  /* eslint-disable no-new */
  new Control()
}

export default controlInit
