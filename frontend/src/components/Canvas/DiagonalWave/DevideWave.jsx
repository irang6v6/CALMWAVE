export class DevideWave {
  constructor(canvasWidth, canvasHeight) {
    this.finalX = canvasWidth
    this.finalY = canvasHeight
    this.initialX = 0
    this.initialY = 0
    this.speed = 0.005
    this.inclination =
      ((this.finalY - this.initialY) / (this.finalX - this.initialX)) * 0.9
    this.displacement = this.speed
    this.K = 0.5
    this.F = 15
  }

  line(x) {
    return this.inclination * (x - this.finalX) + this.finalY
  }

  coordY(rad, displacement) {
    const amplitude = 110
    const period = 0.008
    const pr =
      Math.sin(period * rad + displacement) < 0
        ? Math.sin(period * rad + displacement) * 1.1
        : Math.sin(period * rad + displacement)

    return amplitude * pr
  }

  animate(ctx, color) {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.moveTo(this.finalX, this.finalY)
    ctx.lineTo(this.finalX, this.initialY)
    ctx.lineTo(this.initialX, 0)
    let x, y
    for (let i = 0; i < this.finalX; i++) {
      x = this.initialX + i
      y = this.line(i) + this.coordY(i, this.displacement)
      ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.fillStyle = color
    ctx.fill()
    this.displacement += this.speed
  }
}
