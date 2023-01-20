// 이것은 공들이 직접 위치 이동을 해야한다. 그래서 애니메이션을 준것.
import { PI2 } from "./WaveBackground"

export class Point {
  constructor(POINT_GAP, i, canvasWidth, canvasHeight) {
    this.pointCenterX = POINT_GAP * i
    this.radian = i * 0.38
    this.CENTER_LINE = canvasHeight / 2.2 // 싸인 그래프 높이
    this.VELOCITY = 0.006
    this.AMPLITUDE = canvasHeight / 7.7 // 파고 높이 조정
    this.POINT_RADIUS = 7
    // canvasWidth / 600 < 3.5
    //   ? 3.5
    //   : canvasWidth / 600 < 2.5
    //   ? 2.5
    //   : canvasWidth / 600
    this.pointCenterY =
      this.AMPLITUDE * Math.sin(this.radian) + this.CENTER_LINE
  }
  animate(ctx) {
    this.radian += this.VELOCITY
    this.pointCenterY =
      this.AMPLITUDE * Math.sin(this.radian) + this.CENTER_LINE
    ctx.beginPath()
    ctx.fillStyle = "#618BC0"
    ctx.arc(this.pointCenterX, this.pointCenterY, this.POINT_RADIUS, 0, PI2)
    ctx.fill()
  }
}
