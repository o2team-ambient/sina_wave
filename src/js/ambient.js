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
  let sinaWave = new SinaWave(document.getElementById('sinewaves'), opts)
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

const handleReport = () => {
  Report.init({})
  Report.processPV(34)
}

if (typeof window.XView === 'undefined') {
  handleReport()
} else {
  window.handleReport = handleReport
}
