const waves = [
  {
    timeModifier: 1,   // This is multiplied againse `speed`
    lineWidth: 3,      // Stroke width
    amplitude: 150,    // How tall is the wave
    wavelength: 200,   // How long is the wave
    segmentLength: 20, // How smooth should the line be
    strokeStyle: 'rgba(255, 255, 255, 0.5)', // Stroke color and opacity
    type: 'sine'       // Wave type
  },
  {
    timeModifier: 1,
    lineWidth: 2,
    amplitude: 150,
    wavelength: 100,
    strokeStyle: 'rgba(255, 255, 255, 0.3)'
  }
]
// const wavesObj = encodeWaves(waves)

export default {
  // General speed of entire wave system
  speed: 8,

  // How many degress should we rotate all of the waves
  rotate: 0,

  // Ease function from left to right
  ease: 'Linear',

  // Specific how much the width of the canvas the waves should be
  // This can either be a number or a percent
  wavesWidth: 95,

  waves
}