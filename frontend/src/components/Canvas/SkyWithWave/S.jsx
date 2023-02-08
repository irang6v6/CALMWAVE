export class S {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight / 1.3
    this.x = Math.random() * canvasWidth
    this.y = (Math.random() * canvasHeight) / 1.3
    this.dy = -Math.random() / 9
    this.dx = -this.dy * 2
    this.radius = Math.random() * 2
    this.sx = Math.random() * this.canvasWidth
    this.sy = Math.floor(Math.random() * this.canvasHeight)
    this.opacity = Math.random() * 3.9
  }

  drawingStar(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
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
      this.sy + this.canvasHeight * 0.014
    )
    ctx.strokeStyle = `rgba(255, 255, 255, 0.66)`
    ctx.lineWidth = 3
    ctx.stroke()
    if (this.sx + this.radius > this.canvasWidth * 30) {
      this.sx = Math.random() * this.canvasWidth
      this.sy = Math.floor(Math.random() * this.canvasHeight)
    } else if (this.sy + this.radius > this.canvasHeight * 3) {
      this.sx = Math.random() * this.canvasWidth
      this.sy = Math.floor(Math.random() * this.canvasHeight)
    } else {
      this.sx += this.canvasWidth * 0.05
      this.sy += this.canvasHeight * 0.014
    }
  }
}
