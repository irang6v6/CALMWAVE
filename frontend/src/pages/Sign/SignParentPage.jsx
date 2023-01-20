import { useEffect, useState } from "react"
// import Wave from "../../components/Canvas/Wave/Wave"
import SignPage from "./SignPage"
import styles from "./SignParentPage.module.css"
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"
import { useRef } from "react"
import SecondWave from "../../components/Canvas/SecondWave/SecondWave"

function SignParentPage() {
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
  useCustomWidthHeight(pageRef) //, setCanvasWidth, setCanvasHeight
  return (
    <>
      <div className={`${styles["wave-container"]}`}>
        {/* background, FstColor, SndColor, TrdColor */}
        <SecondWave
          canvasHeight={canvasHeight}
          canvasWidth={canvasWidth}
          background={`rgb(255, 255, 255)`}
          FstColor={`rgba(76, 230, 184, 0.85)`}
          SndCOlor={`rgba(153, 214, 234, 0.85)`}
          TrdColor={`rgba(29, 88, 164, 0.85)`}
        />
        {/* <Wave canvasHeight={canvasHeight} canvasWidth={canvasWidth} /> */}
      </div>
      <SignPage pageRef={pageRef} />
    </>
  )
}

export default SignParentPage
