import { useEffect, useRef } from "react"

export const useSecondWave = function (canvasWidth, canvasHeight, animate) {
  const canvasRef = useRef(null)
  useEffect(
    function () {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")

      const setCanvas = function () {
        const devicePixelRatio = window.devicePixelRatio ?? 1
        if (canvas && ctx) {
          canvas.style.width = canvasWidth + "px"
          canvas.style.height = canvasHeight + "px"

          canvas.width = canvasWidth * devicePixelRatio
          canvas.height = canvasHeight * devicePixelRatio

          ctx.scale(devicePixelRatio, devicePixelRatio)
        }
      }
      setCanvas()

      let requestId
      const requestAnimation = function () {
        requestId = window.requestAnimationFrame(requestAnimation)
        if (ctx) {
          animate(ctx)
        }
      }
      requestAnimation()

      return function () {
        window.cancelAnimationFrame(requestId)
      }
    },
    [canvasWidth, canvasHeight, animate]
  )

  return canvasRef
}
