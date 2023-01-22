export class RainDrop {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth
    this.y = -Math.random() * canvasHeight
    this.linearOptions = [2.5, 3, 3.5, 4, 4.5, 5]
    this.linearSpeed = this.linearOptions[Math.round(Math.random() * 5)]
    this.fillColors = ["#66ccff", "#7CA3F3", "#176FF1"]
    this.fill = this.fillColors[Math.round(Math.random() * 2)]
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
  }

  newSpeed() {
    var startSpeed = this.linearOptions[Math.round(Math.random() * 5)]
    return startSpeed
  }

  animate(ctx) {
    ctx.fillStyle = this.fill
    ctx.beginPath()
    ctx.arc(this.x, this.y, 8, 0 * Math.PI, 1 * Math.PI)
    ctx.lineTo(this.x, this.y - 20)
    ctx.lineTo(this.x + 8, this.y)
    ctx.closePath()
    ctx.fill()
    if (this.y > this.canvasHeight) {
      this.y = 0
      this.x = Math.random() * this.canvasWidth + 50
      this.linearSpeed = this.newSpeed()
    }
    this.y += this.linearSpeed
  }
}
