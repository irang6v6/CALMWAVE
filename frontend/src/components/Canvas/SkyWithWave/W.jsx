export const PI2 = Math.PI * 2
export const EULER_NUMBER = Math.E

export class W {
  constructor(canvasWidth, canvasHeight) {
    this.K = 0.5
    this.F = 15
    this.SPEED = 0.02
    this.NOISE = 30
    this.PHASE = 0
    this.MAX = canvasHeight / 2 - 4
    this.width = window.devicePixelRatio * (canvasWidth || 320)
    this.height = window.devicePixelRatio * (canvasHeight || 100)
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.ATTENUATION = 1
    this.centerX = canvasWidth / 2
    this.centerY = canvasHeight / 5
    this.radius =
      canvasWidth / 48 > 48 ? 48 : canvasWidth / 48 < 24 ? 24 : canvasWidth / 48
  }

  wave(ctx, color, speed, att, plce) {
    this.PHASE = (this.PHASE + speed) % (Math.PI * 64)
    ctx.moveTo(0, 0)
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    let x, y
    for (let i = -this.K; i <= this.K; i += 0.01) {
      i = parseFloat(parseFloat(i).toFixed(2))
      x = this.width * ((i + this.K) / (this.K * 2))
      y =
        this.height / plce +
        this.NOISE *
          Math.pow(Math.sin(i * 10 * att), 1) *
          Math.sin(this.F * i - this.PHASE)
      ctx.lineTo(x, y)
    }
    ctx.lineTo(this.canvasWidth, this.canvasHeight)
    ctx.lineTo(0, this.canvasHeight)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
  }
  animate(ctx) {}
}
