import { useEffect, useState } from "react" //
// , setW, setH
export const useCustomWidthHeight = function (ref) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(
    function () {
      const setCustomWidthHeight = function () {
        if (ref.current) {
          setWidth(ref.current.clientWidth)
          setHeight(ref.current.clientHeight)
          // setW(() => ref.current.clientWidth)
          // setH(() => ref.current.clientHeight)
        }
      }
      setCustomWidthHeight()
      window.addEventListener("resize", setCustomWidthHeight)
      return function () {
        window.removeEventListener("resize", setCustomWidthHeight)
      }
    },
    [ref]
  )

  const customRects = { width, height }

  return customRects
}
