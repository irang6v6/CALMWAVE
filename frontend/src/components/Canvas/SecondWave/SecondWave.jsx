import { memo } from "react"
import { useCanvas } from "../../../hooks/custom/useCanvas"
import { EachWave } from "./EachWave"
// import { SecondWaveBackground } from "./SecondWaveBackground"

function SecondWave({
  canvasWidth,
  canvasHeight,
  background,
  FstColor,
  SndColor,
  TrdColor,
  innerColor,
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
    wave1.drawBackground(ctx, innerColor, background) // 첫번째가 내부 색, 두번째가 바깥 색
    wave1.drawLine(ctx, FstColor, 0.022, 1.25, 1.48) // drawLine 인자는 ctx 고정, prop받은 색상, 파도 속도, 굴곡 갯수, 파도 중심 라인 위치
    wave2.drawLine(ctx, SndColor, 0.016, 1.1, 1.46)
    wave3.drawLine(ctx, TrdColor, 0.01, 1.9, 1.43)
  }
  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate)
  return <canvas ref={canvasRef} />
}

export default memo(SecondWave)
