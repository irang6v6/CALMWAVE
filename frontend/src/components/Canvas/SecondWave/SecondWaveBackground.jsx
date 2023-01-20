export const PI2 = Math.PI * 2
export const EULER_NUMBER = Math.E

export class SecondWaveBackground {
  constructor(canvasWidth, canvasHeight) {
    this.centerX = canvasWidth / 2
    this.centerY = canvasHeight / 1.2
    this.radius =
      canvasWidth / 48 > 48 ? 48 : canvasWidth / 48 < 24 ? 24 : canvasWidth / 48
  }
  drawBackground(ctx) {
    const gradientRadius = this.radius * 18 // 그라데이션 범위
    const gradient = ctx.createRadialGradient(
      this.centerX,
      this.centerY,
      0,
      this.centerX,
      this.centerY,
      gradientRadius
    )
    gradient.addColorStop(0, "rgb(71, 121, 100)") // 그라데이션 중앙색 느낌
    gradient.addColorStop(1, "rgba(230, 246, 255, 0.4)") // 그라데이션 끝 색
    ctx.fillStyle = gradient
    ctx.arc(this.centerX, this.centerY, gradientRadius, 0, PI2)
    ctx.fill()
  }
}

// 2, 45, 82 0.24 :
