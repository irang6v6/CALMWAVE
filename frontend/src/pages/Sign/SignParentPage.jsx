import { useEffect, useState } from "react"
// import Wave from "../../components/Canvas/Wave/Wave"
import SignPage from "./SignPage"
import styles from "./SignParentPage.module.css"
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"
import { useRef } from "react"
import SecondWave from "../../components/Canvas/SecondWave/SecondWave"
import NavBar from "../../components/NavBar/NavBar"

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
      <NavBar />
      <div className={`${styles["wave-container"]}`}>
        <SecondWave
          canvasHeight={canvasHeight}
          canvasWidth={canvasWidth}
          background={`rgba(3, 16, 60, 1)`}
          FstColor={`rgba(76, 230, 184, 0.88)`}
          SndColor={`rgba(153, 214, 234, 0.7)`}
          TrdColor={`rgba(29, 88, 164, 0.66)`}
          innerColor={`rgb(76, 230, 184)`}
        />
      </div>
      <SignPage pageRef={pageRef} />
    </>
  )
}

export default SignParentPage
