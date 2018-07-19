import { O2_AMBIENT_CONFIG } from './js/utils/const'
window[O2_AMBIENT_CONFIG] = {
  width: 1960,
  height: 1120,
  speed: 8,
  rotate: 0,
  ease: 'SineOut',
  waveWidth: 100,
  waves: [{
    timeModifier: 1,   // This is multiplied againse `speed`
    lineWidth: 3,      // Stroke width
    amplitude: 150,    // How tall is the wave
    wavelength: 200,   // How long is the wave
    segmentLength: 20, // How smooth should the line be
    strokeStyle: 'rgba(0, 0, 0, 0.5)', // Stroke color and opacity
    type: 'sine'       // Wave type
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
