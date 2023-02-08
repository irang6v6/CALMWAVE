import { memo } from "react"
import { useCanvas } from "../../../hooks/custom/useCanvas"
import { S } from "./S"
import { W } from "./W"
// import { SecondWaveBackground } from "./SecondWaveBackground"

function SkyWithWave({ canvasWidth, canvasHeight }) {
  const fillBackground = function (ctx) {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvasWidth * 0.05,
      canvasHeight
    )
    gradient.addColorStop(0, `rgba(0, 16, 36, 1)`)
    gradient.addColorStop(0.3, `rgba(0, 18, 39, 1)`)
    gradient.addColorStop(0.77, `rgba(0, 25, 48, 1)`)
    gradient.addColorStop(1, `rgba(39, 67, 99, 1)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }
  const wave1 = new W(canvasWidth, canvasHeight)
  const wave2 = new W(canvasWidth, canvasHeight)
  const wave3 = new W(canvasWidth, canvasHeight)
  let stars = []
  for (let i = 0; i < canvasWidth / 3; i++) {
    stars.push(new S(canvasWidth, canvasHeight))
  }

  const animate = function (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    fillBackground(ctx)
    stars.forEach((star) => star.drawingStar(ctx))
    wave1.wave(ctx, `rgba(7, 128, 200, 0.88)`, 0.018, 1.25, 1.38)
    wave2.wave(ctx, `rgba(76, 230, 184, 0.4)`, 0.014, 1.1, 1.36)
    wave3.wave(ctx, `rgba(19, 72, 151, 0.8)`, 0.01, 1.9, 1.33)
  }
  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)
  return <canvas ref={canvasRef} />
}

export default memo(SkyWithWave)
