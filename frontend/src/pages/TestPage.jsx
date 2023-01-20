// import SecondWave from "../components/Canvas/SecondWave/SecondWave"
import DiagonalWave from "../components/Canvas/DiagonalWave/DiagonalWave"
import Wave from "../components/Canvas/Wave/Wave"

function TestPage() {
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
      <Wave canvasHeight={1000} canvasWidth={1200} />
    </>
  )
}

export default TestPage
