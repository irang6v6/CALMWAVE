import { memo } from "react"
import { useCanvas } from "../../../hooks/custom/useCanvas"
import { LinearGraph } from "./LinearGraph"

function FooterGraph({
  canvasWidth,
  canvasHeight,
  bgColor,
  fillColor,
  maxPoint,
  nowPoint,
}) {
  // const fillBackground = function (ctx) {
  //   ctx.fillStyle = bgColor
  //   ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  // }

  const g = new LinearGraph(
    canvasWidth,
    canvasHeight,
    maxPoint || 100,
    nowPoint || 0
  )
  const animate = function (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    // fillBackground(ctx)
    g.fillMaxBong(ctx, bgColor)
    g.fillFrontBong(ctx, fillColor)
  }

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)

  return <canvas ref={canvasRef} />
}

export default memo(FooterGraph)
