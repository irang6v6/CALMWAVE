export class SkyObject {
  constructor() {}

  gradientBackground(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 350, 0)
    gradient.addColorStop(0, "rgba(120, 17, 240, 0.8)")
    gradient.addColorStop(1, "rgba(22, 240, 1, 0.8)")
    ctx.fillStyle = gradient
    ctx.fill()
  }
  drawingStar(ctx) {}
  starFall(ctx) {}
}
