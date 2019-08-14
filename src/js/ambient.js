import Report from '@o2team/ambient-report'
import './utils/raf'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_INIT,
  O2_AMBIENT_CONFIG
} from './utils/const'
import SinaWave from './sina_wave'

// 判断是否可点，被点中则隐藏
const wrapper = document.querySelector('.o2team_ambient_main')
wrapper.addEventListener('click', () => {
  wrapper.style.display = 'none'
})

// 初始化函数
function initAmbient () {
  const opts = window[O2_AMBIENT_CONFIG]
  const canvas = document.createElement('canvas')
  canvas.style = 'pointer-events: none; position:fixed; top:0; left:50%; transform: translateX(-50%); max-width: 100%; height: 300px; z-index: 1'
  canvas.id = 'sine_wave_canvas'
  document.body.appendChild(canvas)
  let sinaWave = new SinaWave(canvas, opts)
  window[O2_AMBIENT_MAIN] = sinaWave
}

// 初始化函数
window[O2_AMBIENT_INIT] = initAmbient

try {
  // 保证配置读取顺序
  let csi = setInterval(() => {
    if (!window[O2_AMBIENT_CONFIG]) return
    clearInterval(csi)
    initAmbient()
  }, 500)
} catch (e) {
  console.log(e) 
}

Report.init({})
Report.processPV()
