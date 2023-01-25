import { useCanvas } from "../../../hooks/custom/useCanvas"
import { DevideWave } from "./DevideWave"

function DiagonalWave({ canvasWidth, canvasHeight, leftColor, rightColor }) {
  const fillBackground = function (ctx) {
    ctx.fillStyle = leftColor
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }
  const deviding = new DevideWave(canvasWidth, canvasHeight)
  const animate = function (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    fillBackground(ctx)
    deviding.animate(ctx, rightColor)
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)

  return <canvas ref={canvasRef} />
}

export default DiagonalWave
