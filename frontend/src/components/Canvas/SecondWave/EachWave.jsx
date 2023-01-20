export class EachWave {
  constructor(EACH_WIDTH, canvasWidth, canvasHeight) {
    this.K = 0.5
    this.F = 15
    this.SPEED = 0.1
    this.NOISE = 30
    this.PHASE = this.SPEED % (Math.PI * 64)
    this.MAX = canvasHeight / 2 - 4
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.ATTENUATION = 1
  }

  Attenuation(x) {
    return Math.pow((this.K * 4) / (this.K * 4 + Math.pow(x, 4)), this.K * 2)
  }

  drawLine(ctx) {
    ctx.moveTo(0, 0)
    ctx.beginPath()
    ctx.strokeStyle = "rgba(100, 250, 22, 1)"
    ctx.lineWidth = 1
    ctx.lineTo(this.canvasWidth, this.canvasHeight)
    ctx.lineTo(0, this.canvasHeight)
    ctx.fillStyle = "rgba(20, 1, 240, 0.6)"
    ctx.fill()
  }

  animate(ctx) {}
}

// for (let i = -this.K; i <= this.K; i += 0.01) {
//   i = parseFloat(parseFloat(i).toFixed(2))
//   x = this.canvasWidth * ((i + this.K) / (this.K * 2))
//   y =
//     this.canvasHeight / 2 +
//     this.NOISE *
//       Math.pow(Math.sin(i * 10 * this.ATTENUATION), 1) *
//       Math.sin(this.F * i - this.PHASE)
//   ctx.lineTo(x, y)
// }
