import { useCanvas } from "../../../hooks/custom/useCanvas"
import { LightSource } from "./WaveBackground"
import { Point } from "./WavePoint"

function Wave({ canvasWidth, canvasHeight, background }) {
  const fillBackground = function (ctx) {
    // ctx.fillStyle = "rgb(230, 246, 255)" // 배경색
    // ctx.fillStyle = "rgb(31, 31, 36)" // 배경색
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  const lightSource = new LightSource(canvasWidth, canvasHeight)
  let points = []
  const initPoints = function () {
    const POINT_NUMBER = 48
    const POINT_GAP = canvasWidth / POINT_NUMBER

    for (let i = 0; i <= POINT_NUMBER; i++) {
      const point = new Point(POINT_GAP, i, canvasWidth, canvasHeight)
      points.push(point)
    }
  }
  if (canvasWidth !== 0 && canvasHeight !== 0) {
    initPoints()
  }

  const animate = function (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    fillBackground(ctx)
    lightSource.drawRadialGradientBehindLightSource(ctx, background)
    lightSource.drawLightSource(ctx)

    for (let i = 0; i < points.length; i++) {
      lightSource.drawLightLines(
        ctx,
        points[i].pointCenterX,
        points[i].pointCenterY
      )
      points[i].animate(ctx)
    }
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)

  return <canvas ref={canvasRef} />
}

export default Wave
