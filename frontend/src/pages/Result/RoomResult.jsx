import { useRef, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "./RoomResult.module.css"
import NightSky from "../../components/Canvas/NightSky/NightSky"
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"
import { AiFillHome } from "react-icons/ai"
import { ResponsiveRadar } from "@nivo/radar"
import { ResponsivePie } from "@nivo/pie"

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
          <div className={`${styles[`graph`]}`}>
            {data?.radarChart.length > 2 ? (
              <ResponsiveRadar
                data={data?.radarChart}
                keys={["aimedTime", "totalTime"]}
                indexBy={"title"}
                colors={{ scheme: "blues" }}
                borderWidth={3}
              />
            ) : (
              <span></span>
            )}
          </div>
          <div className={`${styles[`graph`]}`}>
            {data ? (
              <ResponsivePie
                data={data?.pieChartByWork}
                colors={{ scheme: "blues" }}
                borderWidth={3}
              />
            ) : (
              <span></span>
            )}
          </div>
          <div className={`${styles[`graph`]}`}>
            {data ? (
              <ResponsivePie
                data={data?.pieChartByCategory}
                colors={{ scheme: "blues" }}
                borderWidth={3}
              />
            ) : (
              <span></span>
            )}
          </div>
          <div className={`${styles[`text`]}`}>
            {data ? (
              <div>
                {/* 추후에 시간 파싱 바꾸기 */}
                {data?.todayTotalWorkTime >= 3600 ? (
                  <span>
                    {Math.floor((data?.todayTotalWorkTime / 3600) % 60)}
                    {"시간 "}
                  </span>
                ) : (
                  <span></span>
                )}
                {data?.todayTotalWorkTime >= 60 ? (
                  <span>
                    {Math.floor((data?.todayTotalWorkTime / 60) % 60)}
                    {"분 "}
                  </span>
                ) : (
                  <span>
                    {Math.floor(data?.todayTotalWorkTime % 60)}
                    {"초"}
                  </span>
                )}
                {" / "}
                {data?.totalAimedTime / 3600} {"시간"}
              </div>
            ) : (
              <span></span>
            )}
          </div>
          <NavLink to={`/`} className={`${styles[`lets-go-home`]}`}>
            <AiFillHome className={`${styles[`play-icon`]} `} />
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default RoomResult
