import { useCanvas } from "../../../hooks/custom/useCanvas"
import { SkyObject } from "./SkyObject"

function NightSky({ canvasWidth, canvasHeight, background }) {
  const fillBackground = function (ctx) {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }
  const night = new SkyObject()
  const animate = function (ctx) {
    fillBackground(ctx)
    night.gradientBackground(ctx)
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)

  return <canvas ref={canvasRef} />
}

export default NightSky
