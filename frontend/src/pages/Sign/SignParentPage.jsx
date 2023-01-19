import { useEffect, useState } from "react"
import Wave from "../../components/Canvas/Wave/Wave"
import SignPage from "./SignPage"
import styles from "./SignParentPage.module.css"

function SignParentPage() {
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)
  /* eslint-disable */
  useEffect(
    function () {
      setCanvasHeight(window.innerHeight)
      setCanvasWidth(window.innerWidth)
    },
    [window.innerHeight, window.innerWidth]
  )
  // useCustomWidthHeight(pageBox) //, setCanvasWidth, setCanvasHeight
  return (
    <>
      <div className={`${styles["wave-container"]}`}>
        <Wave canvasHeight={canvasHeight} canvasWidth={canvasWidth} />
      </div>
      <SignPage />
    </>
  )
}

export default SignParentPage
