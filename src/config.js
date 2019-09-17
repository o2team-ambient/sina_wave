import { O2_AMBIENT_CONFIG } from './js/utils/const'
window[O2_AMBIENT_CONFIG] = {
  width: window.innerWidth,
  height: window.innerHeight,
  speed: 8,
  rotate: 0,
  ease: 'SineInOut',
  waveWidth: 100,
  waves: [{
    timeModifier: 4, // This is multiplied againse `speed`
    lineWidth: 1, // Stroke width
    amplitude: -25, // How tall is the wave
    wavelength: 25, // How long is the wave
    strokeStyle: 'rgba(0, 0, 0, 0.5)', // Stroke color and opacity
    type: 'sine' // Wave type
  }, {
    timeModifier: 1,
    lineWidth: 2,
    amplitude: 150,
    wavelength: 100,
    segmentLength: 20,
    strokeStyle: 'rgba(0, 0, 0, 0.3)',
    type: 'sine'
  }]
}
