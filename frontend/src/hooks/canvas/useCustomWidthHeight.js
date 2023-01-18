import { useEffect, useState } from "react"

export const useCustomWidthHeight = function (ref) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(function () {
    const setCustomWidthHeight = function () {
      if (ref.current) {
        setWidth(ref.current.customWidth)
        setHeight(ref.current.customHeight)
      }
    }
    setCustomWidthHeight()
    window.addEventListener("resize", setCustomWidthHeight)

    return function () {
      window.removeEventListener("resize", setCustomWidthHeight)
    }
  }, [])

  const customRects = { width, height }

  return customRects
}
