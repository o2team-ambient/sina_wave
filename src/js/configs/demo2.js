const waves = [
  {
    timeModifier: 4,
    lineWidth: 1,
    amplitude: -25,
    wavelength: 25
  },
  {
    timeModifier: 2,
    lineWidth: 2,
    amplitude: -50,
    wavelength: 50
  },
  {
    timeModifier: 1,
    lineWidth: 1,
    amplitude: -100,
    wavelength: 100
  },
  {
    timeModifier: 0.5,
    lineWidth: 1,
    amplitude: -200,
    wavelength: 200
  },
  {
    timeModifier: 0.25,
    lineWidth: 2,
    amplitude: -400,
    wavelength: 400
  }
]
// const wavesObj = encodeWaves(waves)

export default {
  speed: 4,
  
  width: window.innerWidth,
  
  height: window.innerHeight,
  
  ease: 'SineInOut',
  
  wavesWidth: 70,
  
  // Called on window resize
  resizeEvent: encodeURI((function () {
    var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
    gradient.addColorStop(0, "rgba(23, 210, 168, 0.2)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)");
    gradient.addColorStop(1, "rgba(23, 210, 168, 0.2)");
    
    var index = -1;
    var length = this.waves.length;
      while(++index < length){
      this.waves[index].strokeStyle = gradient;
    }
    
    // Clean Up
    index = void 0;
    length = void 0;
    gradient = void 0;
  }).toString()),

  waves
}