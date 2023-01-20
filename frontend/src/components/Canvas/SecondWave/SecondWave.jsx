import { useSecondWave } from "../../../hooks/custom/useSecondWave"
import { EachWave } from "./EachWave"
// import { SecondWaveBackground } from "./SecondWaveBackground"

function SecondWave({
  canvasWidth,
  canvasHeight,
  background,
  FstColor,
  SndColor,
  TrdColor,
}) {
  const fillBackground = function (ctx) {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }
  const wave1 = new EachWave(canvasWidth, canvasHeight)
  const wave2 = new EachWave(canvasWidth, canvasHeight)
  const wave3 = new EachWave(canvasWidth, canvasHeight)

  const animate = function (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    fillBackground(ctx)
    wave1.drawLine(ctx, FstColor, 0.022, 1.3, 1.47)
    wave2.drawLine(ctx, SndColor, 0.017, 1, 1.46)
    wave3.drawLine(ctx, TrdColor, 0.01, 1.5, 1.44)
  }
  const canvasRef = useSecondWave(canvasWidth, canvasHeight, animate)
  return <canvas ref={canvasRef} />
}

export default SecondWave
