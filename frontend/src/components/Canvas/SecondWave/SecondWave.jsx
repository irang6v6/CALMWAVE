import { useSecondWave } from "../../../hooks/custom/useSecondWave"
import { EachWave } from "./EachWave"
// import { SecondWaveBackground } from "./SecondWaveBackground"

function SecondWave({ canvasWidth, canvasHeight }) {
  const fillBackground = function (ctx) {
    ctx.fillStyle = "rgba(22, 0, 95, 0.5)"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }
  // const background = new SecondWaveBackground(canvasWidth, canvasHeight)
  const wave1 = new EachWave(1, canvasWidth, canvasHeight)
  console.log(wave1)
  const animate = function (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    fillBackground(ctx)

    for (let i = -0.5; i <= 0.5; i += 0.01) {
      i = parseFloat(parseFloat(i).toFixed(2))
      let x = canvasWidth * ((i + 0.5) / (0.5 * 2))
      let y =
        canvasHeight / 2 +
        30 *
          Math.pow(Math.sin(i * 10 * 1), 1) *
          Math.sin(15 * i - Math.PI * 64 * 0.1)
      ctx.lineTo(x, y)
    }
  }
  const canvasRef = useSecondWave(canvasWidth, canvasHeight, animate)
  return <canvas ref={canvasRef} />
}

export default SecondWave
