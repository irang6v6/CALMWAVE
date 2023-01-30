// import SecondWave from "../components/Canvas/SecondWave/SecondWave"
import DiagonalWave from "../components/Canvas/DiagonalWave/DiagonalWave"
import Wave from "../components/Canvas/Wave/Wave"
import SecondWave from "../components/Canvas/SecondWave/SecondWave"
import Rain from "../components/Canvas/Rain/Rain"
import { useState, useEffect, useRef } from "react"
import someImg from "../assets/calmwave.png"
import NightSky from "../components/Canvas/NightSky/NightSky"
import Earth from "../components/Canvas/Earth/Earth"
import SecondNightSky from "../components/Canvas/SecondNightSky/SecondNightsky"
import { useCustomWidthHeight } from "../hooks/custom/useCustomWidthHeight"

function TestPage() {
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)
  const canvRef = useRef(null)
  /* eslint-disable */
  useEffect(
    function () {
      setCanvasHeight(window.innerHeight)
      setCanvasWidth(window.innerWidth)
    },
    [window.innerHeight, window.innerWidth]
  )
  const { width, height } = useCustomWidthHeight(canvRef)
  console.log(width, height)
  return (
    <>
      <div>테스트</div>
      <div>테스트</div>
      <div style={{ display: "none" }}>
        <img src={someImg} id={`test-logo`} />
      </div>
      <SecondNightSky
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        background={`rgba(32, 38, 38, 1) `}
      />
      <Earth
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        background={`rgba(32, 38, 38, 1) `}
      />
      <NightSky
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        background={`rgba(32, 38, 38, 1) `}
      />
      <Rain
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        background={`rgba(29, 88, 164, 0.66)`}
      />
      <DiagonalWave
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        leftColor={`rgba(255, 255, 255, 1)`}
        rightColor={`rgba(29, 88, 164, 0.66)`}
      />
      <SecondWave
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        background={`rgba(255, 255, 255, 1)`}
        FstColor={`rgba(76, 230, 184, 0.88)`}
        SndColor={`rgba(153, 214, 234, 0.7)`}
        TrdColor={`rgba(29, 88, 164, 0.66)`}
        innerColor={`rgb(168, 138, 255)`}
      />
      <Wave
        canvasHeight={canvasHeight}
        canvasWidth={canvasWidth}
        background={`rgba(31, 31, 36)`}
      />
      <div ref={canvRef}>can i get size?</div>
    </>
  )
}

export default TestPage
