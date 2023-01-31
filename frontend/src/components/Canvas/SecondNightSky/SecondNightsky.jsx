import { memo } from "react"
import { useCanvas } from "../../../hooks/custom/useCanvas"
import { SecondSkyObject } from "./SecondSkyObject"

function SecondNightSky({ canvasWidth, canvasHeight, background }) {
  const fillBackground = function (ctx) {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }
  const dots = []
  for (let i = 0; i < 250; i++) {
    dots.push(new SecondSkyObject(canvasWidth, canvasHeight))
  }
  const skyobj = new SecondSkyObject(canvasWidth, canvasHeight)
  const animate = function (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    fillBackground(ctx)
    skyobj.animate(ctx)
    dots.forEach((dot) => dot.animate(ctx))
  }
  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)

  return <canvas ref={canvasRef} />
}

export default memo(SecondNightSky)
