import { memo } from "react"
import { useCanvas } from "../../../hooks/custom/useCanvas"
import { BackgroundSource, LandNCloud, Star } from "./Planet"

function Earth({ canvasWidth, canvasHeight, background }) {
  const bgsource = new BackgroundSource(canvasWidth, canvasHeight)
  const clouds = []
  const lands = []
  for (let i = 0; i < 13; i++) {
    clouds.push(new LandNCloud(canvasWidth, canvasHeight))
    lands.push(new LandNCloud(canvasWidth, canvasHeight))
  }
  const stars = []
  for (let i = 0; i < 51; i++) {
    stars.push(new Star(canvasWidth, canvasHeight))
  }
  const animate = function (ctx) {
    bgsource.fillBackground(ctx)
    bgsource.gradientBackground(
      ctx,
      `rgb(25, 118, 181)`,
      `rgba(11, 21, 56,0.3)`
    )
    stars.forEach((star) => star.drawSpikeStar(ctx))
    bgsource.circle(ctx, `rgb(25, 118, 181)`)
    lands.forEach((land) => land.animate(ctx, `rgb(133, 204, 102)`))
    clouds.forEach((cloud) => cloud.animate(ctx, `rgba(255, 255, 255, 0.8)`))
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)
  return <canvas ref={canvasRef} />
}

export default memo(Earth)
