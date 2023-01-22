import { useCanvas } from "../../../hooks/custom/useCanvas"

function Rain({ background, canvasWidth, canvasHeight }) {
  const fillBackground = function (ctx) {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  const animate = function (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    fillBackground(ctx)
  }
  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)

  return <canvas />
}

export default Rain
