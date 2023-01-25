export const PI2 = Math.PI * 2
export const EULER_NUMBER = Math.E

export class EachWave {
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
    this.centerY = canvasHeight / 1.88
    this.radius =
      canvasWidth / 48 > 48 ? 48 : canvasWidth / 48 < 24 ? 24 : canvasWidth / 48
  }

  drawLine(ctx, color, speed, att, plce) {
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

  drawBackground(ctx, innerColor, outerColor) {
    // 안쪽 색이 color1 바깥쪽이 color2
    const gradientRadius = this.radius * 20 // 그라데이션 범위
    const gradient = ctx.createRadialGradient(
      this.centerX,
      this.centerY,
      0,
      this.centerX,
      this.centerY,
      gradientRadius
    )
    gradient.addColorStop(0, innerColor) // 그라데이션 중앙색
    gradient.addColorStop(1, outerColor) // 그라데이션 끝 색
    ctx.fillStyle = gradient
    ctx.arc(this.centerX, this.centerY, gradientRadius, 0, PI2)
    ctx.fill()
    // ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
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
