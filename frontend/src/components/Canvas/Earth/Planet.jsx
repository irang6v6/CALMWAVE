const PI2 = Math.PI * 2

export class LandNCloud {
  constructor(canvasWidth, canvasHeight) {
    this.centerX = canvasWidth / 2
    this.centerY = canvasHeight / 2
    this.earthRadius = canvasHeight * 0.18
    this.halfRadius = this.earthRadius * 0.5
    this.cloudX =
      Math.floor(
        Math.random() *
          (this.centerX +
            this.earthRadius -
            (this.centerX - this.earthRadius) +
            1)
      ) +
      (this.centerX - this.earthRadius)
    this.cloudY =
      Math.floor(Math.random() * this.earthRadius * 2) +
      this.centerY -
      this.earthRadius
    this.dx = (Math.random() + 0.4) * 0.8
    this.cloudWidth = Math.floor(Math.random() * this.earthRadius * 0.1) + 11
    this.cloudLength = Math.floor(Math.random() * this.halfRadius) + 18
    this.maxX = this.centerX - this.earthRadius - this.halfRadius - 18
    this.resetX = this.centerX + this.earthRadius + this.halfRadius + 18
  }

  animate(ctx, color) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.centerX, this.centerY, this.earthRadius, 0, PI2, false)
    ctx.clip()
    ctx.beginPath()
    ctx.moveTo(this.cloudX, this.cloudY)
    ctx.lineCap = "round"
    ctx.lineWidth = this.cloudWidth
    ctx.lineTo(this.cloudX + this.cloudLength, this.cloudY)
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.closePath()
    ctx.restore()

    if (this.cloudX < this.maxX) {
      this.cloudX = this.resetX
    }
    this.cloudX -= this.dx
  }
}

export class BackgroundSource {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.centerX = canvasWidth / 2
    this.centerY = canvasHeight / 2
    this.gradientRadius = canvasHeight * 0.44
    this.earthRadius = canvasHeight * 0.18
  }
  fillBackground(ctx) {
    ctx.fillStyle = `rgba(11, 21, 56, 1)`
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
  }
  gradientBackground(ctx, color1, color2) {
    const gradient = ctx.createRadialGradient(
      this.centerX,
      this.centerY,
      0,
      this.centerX,
      this.centerY,
      this.gradientRadius
    )
    gradient.addColorStop(0, color1)
    gradient.addColorStop(1, color2)
    ctx.fillStyle = gradient
    ctx.arc(this.centerX, this.centerY, this.gradientRadius, 0, PI2)
    ctx.fill()
  }
  circle(ctx, color) {
    ctx.beginPath()
    ctx.arc(this.centerX, this.centerY, this.earthRadius, 0, PI2, false)
    ctx.fillStyle = color
    ctx.fill()
  }
}

export class Star {
  constructor(width, height) {
    this.rot = (Math.PI / 2) * 3
    this.centerX = Math.random() * width
    this.centerY = Math.random() * height
    this.x = this.centerX
    this.y = this.centerY
    this.spikes = 4
    this.outerRadius = Math.floor(Math.random() * 4) + 2
    this.innerRadius = 1
    this.step = Math.PI / this.spikes
  }

  drawSpikeStar(ctx) {
    // ctx.strokeStyle = `rgba(0, 0, 0, 1)`
    ctx.beginPath()
    ctx.moveTo(this.centerX, this.centerY - this.outerRadius)
    for (let i = 0; i < this.spikes; i++) {
      this.x = this.centerX + Math.cos(this.rot) * this.outerRadius
      this.y = this.centerY + Math.sin(this.rot) * this.outerRadius
      ctx.lineTo(this.x, this.y)
      this.rot += this.step
      this.x = this.centerX + Math.cos(this.rot) * this.innerRadius
      this.y = this.centerY + Math.sin(this.rot) * this.innerRadius
      ctx.lineTo(this.x, this.y)
      this.rot += this.step
    }
    ctx.lineTo(this.centerX, this.centerY - this.outerRadius)
    ctx.closePath()
    ctx.lineWidth = 5
    ctx.strokeStyle = `rgba(32, 66, 136)`
    ctx.stroke()
    ctx.fillStyle = "skyblue"
    ctx.fill()
  }
}

export class StarFall {
  // constructor() {}
}

// export class ShootingStar {
//   constructor() {
//     this.starX = Math.random() * canvas.width
//     this.starY = Math.random() * canvas.height
//     this.dx = (Math.random() - 0.5) * 10
//     this.dy = (Math.random() - 0.5) * 10
//     this.starRadius = Math.random() * 2 + 1
//   }
//   draw(ctx, color) {
//     ctx.beginPath()
//     ctx.arc(this.starX, this.starY, this.starRadius, 0, PI2, true)
//     ctx.closePath()
//     ctx.fillStyle = color
//     ctx.fill()
//     this.starX += this.dx
//     this.starY = this.dy
//     if (starX) {
//     }
//   }
// }
