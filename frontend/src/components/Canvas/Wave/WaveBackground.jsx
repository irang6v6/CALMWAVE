// 이것도 애니메이션 이동이 필요해서 클래스로 만들어두고 지속적으로 변형 시킨 것이다.
export const PI2 = Math.PI * 2
export const EULER_NUMBER = Math.E

export class LightSource {
  constructor(canvasWidth, canvasHeight) {
    this.centerX = canvasWidth / 2 // 중앙 공 위치 가로 조정
    this.centerY = canvasHeight / 1.2 // 중앙 공 위치 세로 조정
    this.radius =
      canvasWidth / 48 > 48 ? 48 : canvasWidth / 48 < 24 ? 24 : canvasWidth / 48 // 공 사이즈
  }
  drawRadialGradientBehindLightSource(ctx, color) {
    const gradientRadius = this.radius * 18 // 그라데이션 범위
    const gradient = ctx.createRadialGradient(
      this.centerX,
      this.centerY,
      0,
      this.centerX,
      this.centerY,
      gradientRadius
    )
    gradient.addColorStop(0, "rgb(74, 121, 182)") // 그라데이션 중앙색 느낌
    gradient.addColorStop(1, color) // 그라데이션 끝 색
    ctx.fillStyle = gradient
    ctx.arc(this.centerX, this.centerY, gradientRadius, 0, PI2)
    ctx.fill()
  }
  drawLightSource(ctx) {
    ctx.beginPath()
    ctx.fillStyle = "#1D58A4"
    ctx.arc(this.centerX, this.centerY, this.radius, 0, PI2)
    ctx.fill()
  }
  drawLightLines(ctx, pointCenterX, pointCenterY) {
    ctx.strokeStyle = "rgb(176, 176, 212, 0.24)"
    ctx.lineWidth = 1
    ctx.moveTo(this.centerX, this.centerY - this.radius)
    ctx.lineTo(pointCenterX, pointCenterY)
    ctx.stroke()
  }
}

// 2, 45, 82 0.24 :
