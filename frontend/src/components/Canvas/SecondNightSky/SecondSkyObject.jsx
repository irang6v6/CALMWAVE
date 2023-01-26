export class SecondSkyObject {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.radius = Math.random() * 6 + 1
    this.ds = Math.random() * 60
    this.angle = Math.random() * 2.5
  }

  animate(ctx) {
    ctx.fillStyle = "#FFF"
    ctx.beginPath()
    // ctx.moveTo(this.x, this.y)
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    // ctx.lineTo(this.x, this.y)
    ctx.closePath()
    ctx.fill()
    this.y += Math.cos(this.angle + this.ds) + 1 + this.radius / 2
    this.x -= Math.sin(this.angle) * 1.7
    this.angle += 0.01
    if (this.y > this.canvasHeight + 20) {
      this.y = -20
      this.radius = Math.random() * 6 + 1
    }
    if (this.x < -40) {
      this.x = this.canvasWidth + 10
    }
    if (this.x > this.canvasWidth + 50) {
      this.x = 0
    }
    if (this.angle > 6.28319) {
      this.angle = 0
    }
  }
}
