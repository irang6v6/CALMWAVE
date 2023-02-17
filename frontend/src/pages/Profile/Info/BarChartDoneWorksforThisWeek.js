import React, { useState, useEffect } from "react"
import axios from "axios"
import { ResponsiveBar } from "@nivo/bar"

function BarChartDoneWorksforThisWeek() {
  const [works, setWork] = useState([])
  const [todayWorkCount, setTodayWorkCount] = useState(0)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const today = new Date()
  const dayOfWeek = today.getDay()
  const hour = today.getHours()

  const daysSinceSunday = today.getDay()
  const lastSunday = new Date(today)
  lastSunday.setDate(today.getDate() - daysSinceSunday - 7)
  const lastSaturday = new Date(today)
  lastSaturday.setDate(today.getDate() - daysSinceSunday - 1)
  const thisSunday = new Date(today)
  thisSunday.setDate(today.getDate() - daysSinceSunday)
  const thisSaturday = new Date(today)
  thisSaturday.setDate(today.getDate() - daysSinceSunday + 6)

  const lastSundayStr = `${lastSunday.getFullYear()}${(
    lastSunday.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${lastSunday.getDate().toString().padStart(2, "0")}`
  const lastSaturdayStr = `${lastSaturday.getFullYear()}${(
    lastSaturday.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${lastSaturday.getDate().toString().padStart(2, "0")}`
  const thisSundayStr = `${thisSunday.getFullYear()}${(
    thisSunday.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${thisSunday.getDate().toString().padStart(2, "0")}`
  const thisSaturdayStr = `${thisSaturday.getFullYear()}${(
    thisSaturday.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${thisSaturday.getDate().toString().padStart(2, "0")}`

  useEffect(function () {
    if (dayOfWeek === 0 && hour <= 4) {
      setStartDate(() => lastSundayStr)
      setEndDate(() => lastSaturdayStr)
    } else {
      setStartDate(() => thisSundayStr)
      setEndDate(() => thisSaturdayStr)
    }
  })

  useEffect(() => {
    if (startDate && endDate) {
      const fetchWork = async () => {
        try {
          axios
            .get(
              `https://i8a105.p.ssafy.io/api/v1/data/mypage/done-works-dates/${startDate}/${endDate}`,
              {}
            )
            .then((result1) => {
              setWork(processData(result1.data))
            })
            .catch((error) => {})

          axios
            .get(
              "https://i8a105.p.ssafy.io/api/v1/data/mypage/done-works-cnt/today",
              {}
            )
            .then((result2) => {
              setTodayWorkCount(result2.data)
            })
            .catch((error) => {})
        } catch (error) {}
      }

      fetchWork()
    }
  }, [todayWorkCount, startDate, endDate])

  const todaysdayOfWeek = today.toLocaleDateString("en-US", {
    weekday: "short",
  })

  const processData = (data) => {
    const counts = data.reduce((accumulator, current) => {
      const date = new Date(current.dateFinished)
      const dayOfTheWeek = date.toLocaleDateString("en-US", {
        weekday: "short",
      })
      accumulator[dayOfTheWeek] = accumulator[dayOfTheWeek] || 0
      accumulator[dayOfTheWeek] += 1
      return accumulator
    }, {})

    const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return daysOfTheWeek.map((dayOfTheWeek) => ({
      dayOfTheWeek,
      count:
        dayOfTheWeek === todaysdayOfWeek
          ? todayWorkCount
          : counts[dayOfTheWeek] || 0,
    }))
  }

  const handle = {
    barClick: (data) => {},

    legendClick: (data) => {},
  }

  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div
      style={{
        width: "800px",
        height: "500px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {works.some((e) => e.count >= 1) ? (
        <ResponsiveBar
          /**
           * chart에 사용될 데이터
           */
          data={works}
          /**
           * chart에 보여질 데이터 key (측정되는 값)
           */
          keys={["count"]}
          /**
           * keys들을 그룹화하는 index key (분류하는 값)
           */
          indexBy="dayOfTheWeek"
          /**
           * chart margin
           */
          margin={{ top: 50, left: 130, right: 130, bottom: 70 }}
          /**
           * chart padding (bar간 간격)
           */
          padding={0.3}
          /**
           * chart 색상
           */
          //colors={['olive', 'brown', 'orange']} // 커스터하여 사용할 때
          colors={{ scheme: "pastel2" }} // nivo에서 제공해주는 색상 조합 사용할 때
          /**
           * color 적용 방식
           */
          colorBy="id" // 색상을 keys 요소들에 각각 적용
          // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용
          theme={{
            /**
             * label style (bar에 표현되는 글씨)
             */
            labels: {
              text: {
                fontSize: 14,
                fill: "#000000",
              },
            },
            /**
             * legend style (default로 우측 하단에 있는 색상별 key 표시)
             */
            legends: {
              text: {
                fontSize: 12,
                fill: "#000000",
              },
            },
            axis: {
              /**
               * axis legend style (bottom, left에 있는 글씨)
               */
              legend: {
                text: {
                  fontSize: 15,
                  fill: "white",
                },
              },
              /**
               * axis ticks style (bottom, left에 있는 값)
               */
              ticks: {
                text: {
                  fontSize: 16,
                  fill: "white",
                },
              },
            },
          }}
          /**
           * axis bottom 설정
           */
          axisBottom={{
            tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
            tickPadding: 5, // tick padding
            tickRotation: 0, // tick 기울기
            legend: "요일", // bottom 글씨
            legendPosition: "middle", // 글씨 위치
            legendOffset: 50, // 글씨와 chart간 간격
          }}
          /**
           * axis left 설정
           */
          axisLeft={{
            tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
            tickPadding: 5, // tick padding
            tickRotation: 0, // tick 기울기
            legend: "업무 수", // left 글씨
            legendPosition: "middle", // 글씨 위치
            legendOffset: -70, // 글씨와 chart간 간격
          }}
          /**
           * label 안보이게 할 기준 width
           */
          labelSkipWidth={36}
          /**
           * label 안보이게 할 기준 height
           */
          labelSkipHeight={12}
          /**
           * bar 클릭 이벤트
           */
          onClick={handle.barClick}
          /**
           * legend 설정 (default로 우측 하단에 있는 색상별 key 표시)
           */
          legends={[]}
        />
      ) : (
        <div style={{ color: "white", fontSize: "2rem" }}>
          관련 데이터가 없습니다{" "}
        </div>
      )}
    </div>
  )
}

export default BarChartDoneWorksforThisWeek
