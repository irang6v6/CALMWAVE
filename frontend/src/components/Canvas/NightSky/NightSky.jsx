import { memo } from "react"
import { useCanvas } from "../../../hooks/custom/useCanvas"
import { SkyObject } from "./SkyObject"

function NightSky({ canvasWidth, canvasHeight, background }) {
  const fillBackground = function (ctx) {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvasWidth * 0.1,
      canvasHeight
    )
    gradient.addColorStop(0, `rgba(16, 19, 19, 1)`)
    gradient.addColorStop(0.3, `rgba(28, 33, 33, 1)`)
    gradient.addColorStop(0.77, `rgba(32, 38, 38, 1)`)
    gradient.addColorStop(1, `rgba(54, 45, 30, 1)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }
  let stars = []
  let starfalls = [
    new SkyObject(canvasWidth, canvasHeight),
    new SkyObject(canvasWidth, canvasHeight),
    new SkyObject(canvasWidth, canvasHeight),
    new SkyObject(canvasWidth, canvasHeight),
  ]
  for (let i = 0; i < canvasWidth / 2; i++) {
    stars.push(new SkyObject(canvasWidth, canvasHeight))
  }

  const animate = function (ctx) {
    fillBackground(ctx)
    stars.forEach((val) => {
      val.drawingStar(ctx)
    })
    starfalls.forEach((starfall) => {
      starfall.starFall(ctx)
    })
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)

  return <canvas ref={canvasRef} />
}

export default memo(NightSky)
