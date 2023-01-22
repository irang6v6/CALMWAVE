// import SecondWave from "../components/Canvas/SecondWave/SecondWave"
import DiagonalWave from "../components/Canvas/DiagonalWave/DiagonalWave"
import Wave from "../components/Canvas/Wave/Wave"
import SecondWave from "../components/Canvas/SecondWave/SecondWave"
import { useState, useRef, useEffect } from "react"

function TestPage() {
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
  return (
    <>
      <div>테스트</div>
      <div>테스트</div>
      <DiagonalWave
        canvasHeight={900}
        canvasWidth={1300}
        leftColor={`rgba(255, 255, 255, 1)`}
        rightColor={`rgba(29, 88, 164, 0.66)`}
      />
      <SecondWave
        canvasHeight={canvasHeight}
        canvasWidth={canvasWidth}
        background={`rgba(255, 255, 255, 1)`}
        FstColor={`rgba(76, 230, 184, 0.88)`}
        SndColor={`rgba(153, 214, 234, 0.7)`}
        TrdColor={`rgba(29, 88, 164, 0.66)`}
        innerColor={`rgb(168, 138, 255)`}
      />
      <Wave canvasHeight={1000} canvasWidth={1200} />
    </>
  )
}

export default TestPage
