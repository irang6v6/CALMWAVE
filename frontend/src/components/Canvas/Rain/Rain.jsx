import { useCanvas } from "../../../hooks/custom/useCanvas"
import { RainDrop } from "./RainDrop"

function Rain({ background, canvasWidth, canvasHeight }) {
  const fillBackground = function (ctx) {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }
  const rains = []
  for (let i = 0; i < 19; i++) {
    rains.push(new RainDrop(canvasWidth, canvasHeight))
  }

  const animate = function (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    fillBackground(ctx)
    rains.forEach((drop) => {
      drop.animate(ctx)
    })
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)
  return <canvas ref={canvasRef} />
}

export default Rain
