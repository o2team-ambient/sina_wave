const id = 'sina_wave'
const ID = id.toUpperCase()

export const O2_AMBIENT_MAIN = `O2_AMBIENT_${ID}_MAIN`
export const O2_AMBIENT_INIT = `O2_AMBIENT_${ID}_INIT`
export const O2_AMBIENT_CONFIG = `O2_AMBIENT_${ID}_CONFIG`
export const O2_AMBIENT_CLASSNAME = `o2_ambient_${id}`
export const O2_AMBIENT_CONFIG_KEY = `O2_AMBIENT_CONFIG_KEY`
export const O2_AMBIENT_IS_CONFIG_RESET = 'O2_AMBIENT_IS_CONFIG_RESET'

export const waveConfigKeys = {
  timeModifier: '速度',
  lineWidth: '线条宽度',
  amplitude: '波浪高度',
  wavelength: '波长',
  segmentLength: '线条光滑度',
  strokeStyle: '线条颜色',
  type: '波浪类型'
}
