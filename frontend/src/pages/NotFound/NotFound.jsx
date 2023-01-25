import { useState, useEffect, useRef } from "react"
import Earth from "../../components/Canvas/Earth/Earth"
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"
import styles from "./NotFound.module.css"

function NotFound() {
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)
  const pageRef = useRef(null)
  /* eslint-disable */
  useEffect(
    function () {
      setCanvasHeight(window.innerHeight)
      setCanvasWidth(window.innerWidth)
    },
    [window.innerHeight, window.innerWidth]
  )
  useCustomWidthHeight(pageRef)
  return (
    <>
      <div className={`${styles["canvas-container"]}`}>
        <Earth canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
      </div>
      <div ref={pageRef} className={`${styles["page-container"]}`}>
        <div className={`${styles["message"]}`}>페이지가 없습니다!</div>
      </div>
    </>
  )
}

export default NotFound
