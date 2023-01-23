export class SkyObject {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.dy = -Math.random() / 10
    this.dx = -this.dy * 2
    this.radius = Math.random() * 2
    this.sx = Math.random() * this.canvasWidth
    this.sy = Math.floor(Math.random() * this.canvasHeight)
  }

  drawingStar(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.fillStyle = `rgba(255, 255, 255, 1)`
    ctx.fill()
    if (this.x + this.radius > this.canvasWidth) {
      this.x = 0
    } else if (this.y + this.radius < 0) {
      this.y = this.canvasHeight
    }
    this.x += this.dx
    this.y += this.dy
  }

  starFall(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.sx, this.sy)
    ctx.lineTo(
      this.sx + this.canvasWidth * 0.05,
      this.sy + this.canvasHeight * 0.01
    )
    ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`
    ctx.stroke()
    if (this.sx + this.radius > this.canvasWidth * 30) {
      this.sx = Math.random() * this.canvasWidth
      this.sy = Math.floor(Math.random() * this.canvasHeight)
    } else if (this.sy + this.radius > this.canvasHeight * 3) {
      this.sx = Math.random() * this.canvasWidth
      this.sy = Math.floor(Math.random() * this.canvasHeight)
    } else {
      this.sx += this.canvasWidth * 0.05
      this.sy += this.canvasHeight * 0.01
    }
  }
}
