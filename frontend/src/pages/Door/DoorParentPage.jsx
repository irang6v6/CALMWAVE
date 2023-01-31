import styles from "./DoorParentPage.module.css"
import Door from "./Door"
import NightSky from "../../components/Canvas/NightSky/NightSky"
import { useRef } from "react"
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"

function DoorParentPage() {
  const doorRef = useRef(null)
  const { width, height } = useCustomWidthHeight(doorRef)

  return (
    <>
      <div className={`${styles[`canvas-container`]}`}>
        <NightSky canvasWidth={width} canvasHeight={height} />
      </div>
      <Door refVal={doorRef} />
    </>
  )
}

export default DoorParentPage
