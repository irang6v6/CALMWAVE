import { useWave } from "../../../hooks/custom/useWave"
import { LightSource } from "./WaveBackground"
import { Point } from "./WavePoint"

function Wave({ canvasWidth, canvasHeight }) {
  const fillBaackground = function (ctx) {
    ctx.fillStyle = "rgb(230, 246, 255)" // 배경색
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  const lightSource = new LightSource(canvasWidth, canvasHeight)
  let points = []
  const initPoints = function () {
    const POINT_NUMBER = 17
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

    fillBaackground(ctx)
    lightSource.drawRadialGradientBehindLightSource(ctx)
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

  const canvasRef = useWave(canvasWidth, canvasHeight, animate)

  return <canvas ref={canvasRef} />
}

export default Wave
