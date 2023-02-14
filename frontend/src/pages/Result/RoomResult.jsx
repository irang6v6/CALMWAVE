import { useRef, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "./RoomResult.module.css"
import NightSky from "../../components/Canvas/NightSky/NightSky"
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"
import { BsFillStopFill } from "react-icons/bs"
import { ResponsiveRadar } from "@nivo/radar"

import axios from "axios"

function RoomResult() {
  const doorRef = useRef(null)
  const { width, height } = useCustomWidthHeight(doorRef)
  const [data, setData] = useState(null)

  useEffect(() => {
    axios({
      method: "get",
      url: `/v1/data/result`,
    }).then((res) => {
      console.log(res.data)
      setData(res.data)
    })
  }, [])

  return (
    <>
      <div className={`${styles[`canvas-container`]}`}>
        <NightSky canvasWidth={width} canvasHeight={height} />
      </div>
      <div ref={doorRef} className={`${styles[`resultbox-container`]}`}>
        <div className={`${styles[`result-container`]}`}>
          
          {data ? (
            <ResponsiveRadar
              data={data?.radarChart}
              keys={["aimedTime", "totalTime"]}
              indexBy={"title"}
            />
          ) : (
            <span></span>
          )}
        </div>
        <NavLink
                to={`/`}>
                {/* className={`${styles[`lets-go-home`]}`}           */}
                <BsFillStopFill className={`${styles[`play-icon`]}`} />
        </NavLink>
      </div>
    </>
  )
}

export default RoomResult
