/**
 * @desc 处理 waves 数据
 */

export const encodeWaves = arr => {
  let obj = {}
  arr.forEach((item, idx) => {
    Object.keys(item).forEach(key => {
      obj[`waves-${idx}-${key}`] = item[key]
    })
  })
  return obj
}

export const decodeWaves = obj => {
  const waves = []
  Object.keys(obj).forEach(key => {
    const keyArr = key.split('-')
    if (keyArr[0] !== 'waves') return
    const idx = keyArr[1]
    const keyString = keyArr[2]
    if (!waves[idx]) waves[idx] = {}
    waves[idx][keyString] = obj[key]
  })
  return waves
}
