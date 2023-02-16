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

  const backToHome = () => {
    window.localStorage.removeItem("todo")
    window.localStorage.removeItem("category")
  }

  return (
    <>
      <div className={`${styles[`canvas-container`]}`}>
        <NightSky canvasWidth={width} canvasHeight={height} />
      </div>

      <div ref={doorRef} className={`${styles[`resultbox-container`]}`}>
        <div className={`${styles[`result-container`]}`}>
          {/* 업무 시간 & 총 시간 */}
          <div className={`${styles[`result-time`]}`}>
            <div className={`${styles[`text`]}`}>
              {data ? (
                <div>
                  {/* 추후에 시간 파싱 바꾸기 */}
                  목표시간{" "}
                  <span className={`${styles[`aimed-time`]}`}>
                    {data?.totalAimedTime / 3600} {"시간"}
                  </span>{" "}
                  중{" "}
                  {data?.todayTotalWorkTime >= 3600 ? (
                    <span className={`${styles[`aimed-time`]}`}>
                      {Math.floor((data?.todayTotalWorkTime / 3600) % 60)}
                      {"시간 "}
                    </span>
                  ) : (
                    <span></span>
                  )}
                  {data?.todayTotalWorkTime >= 60 ? (
                    <span className={`${styles[`aimed-time`]}`}>
                      {Math.floor((data?.todayTotalWorkTime / 60) % 60)}
                      {"분 "}
                    </span>
                  ) : (
                    <span className={`${styles[`aimed-time`]}`}>
                      {Math.floor(data?.todayTotalWorkTime % 60)}
                      {"초"}
                    </span>
                  )}
                  집중하셨습니다.
                </div>
              ) : (
                <span></span>
              )}
            </div>
          </div>

          <div className={`${styles[`graph-wrap`]}`}>
            {data?.radarChart.length > 2 ? (
              // 그래프 1 (업무 세개 미만일 때 안 나오는 애)
              <div className={`${styles[`graph-box`]}`}>
                <div className={`${styles[`graph`]}`}>
                  <ResponsiveRadar
                    data={data?.radarChart}
                    keys={["aimedTime", "totalTime"]}
                    indexBy={"title"}
                    colors={{ scheme: "blues" }}
                    // borderWidth={3}
                  />
                </div>
                <div className={`${styles[`graph-info`]}`}>
                  목표 시간 대비 총 업무 시간
                </div>
              </div>
            ) : (
              <span></span>
            )}

            {/* 그래프 2 */}
            {data ? (
              <div className={`${styles[`graph-box`]}`}>
                <div className={`${styles[`graph`]}`}>
                  <ResponsivePie
                    data={data?.pieChartByWork}
                    colors={{ scheme: "blues" }}
                    // borderWidth={3}
                  />
                </div>
                <div className={`${styles[`graph-info`]}`}>
                  오늘의 업무 시간 비율
                </div>
              </div>
            ) : (
              <span></span>
            )}

            {/* 그래프 3 */}
            {data ? (
              <div className={`${styles[`graph-box`]}`}>
                <div className={`${styles[`graph`]}`}>
                  <ResponsivePie
                    data={data?.pieChartByCategory}
                    colors={{ scheme: "blues" }}
                    // borderWidth={3}
                  />
                </div>
                <div className={`${styles[`graph-info`]}`}>
                  카테고리별 업무 시간 비율
                </div>
              </div>
            ) : (
              <span></span>
            )}
          </div>
        </div>

        {/* 홈으로 가기 아이콘 */}
        <NavLink
          to={`/`}
          className={`${styles[`lets-go-home`]}`}
          onClick={backToHome}
        >
          <AiFillHome className={`${styles[`play-icon`]} `} />
        </NavLink>
      </div>
    </>
  )
}

export default RoomResult
