import React, { useState, useEffect } from "react"
import axios from "axios"
import { ResponsivePie } from "@nivo/pie"

function PiechartDoneWorksDateRange(props) {
  const [works, setWork] = useState([])
  const selected = props.selected
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")


  const today = new Date()
  const dayOfWeek = today.getDay()
  const date = today.getDate()
  const hour = today.getHours()
  const year = today.getFullYear()
  const month = today.getMonth() + 1

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

  const lastMonthLastDay = new Date(year, month - 1, 0)
  const lastMonthFirstDay = new Date(year, month - 2, 1)
  const thisMonthFirstDay = new Date(year, month - 1, 1)
  const thisMonthLastDay = new Date(year, month, 0)

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}${month}${day}`
  }

  const lastMonthFirstDayFormatted = formatDate(lastMonthFirstDay)
  const lastMonthLastDayFormatted = formatDate(lastMonthLastDay)
  const thisMonthFirstDayFormatted = formatDate(thisMonthFirstDay)
  const thisMonthLastDayFormatted = formatDate(thisMonthLastDay)
  /* eslint-disable */
  useEffect(function () {
    if (selected === "이번주") {
      if (dayOfWeek === 0 && hour <= 4) {
        setStartDate(() => lastSundayStr)
        setEndDate(() => lastSaturdayStr)
      } else {
        setStartDate(() => thisSundayStr)
        setEndDate(() => thisSaturdayStr)
      }
    } else if (selected === "이번달") {
      if (date === 1 && hour < 4) {
        setStartDate(() => lastMonthFirstDayFormatted) //지난달 첫번째 일
        setEndDate(() => lastMonthLastDayFormatted) //지난달 마지막일
      } else {
        setStartDate(() => thisMonthFirstDayFormatted) //이번달 첫번째 일
        setEndDate(() => thisMonthLastDayFormatted) //이번달 마지막 일
      }
    }
  }, [])

  useEffect(() => {
    if (startDate && endDate) {
      const fetchWork = async () => {
        try {
          const [result1, result2] = await axios.all([
            axios.get(
              `https://i8a105.p.ssafy.io/api/v1/data/mypage/done-works/${startDate}/${endDate}`
            ),
            axios.get(
              "https://i8a105.p.ssafy.io/api/v1/data/mypage/done-works/today"
            ),
          ])
          const combinedResults = [...result1.data, ...result2.data]
          setWork(combinedResults)
        } catch (error) {
        }
      }

      fetchWork()
    }
  }, [startDate, endDate])

  const handle = {
    padClick: (data) => {
    },

    legendClick: (data) => {
    },
  }

  const totalMinutes = works.reduce((acc, work) => acc + work.totalTime, 0)

  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div style={{ width: "800px", height: "500px", margin: "0 auto" }}>
      <ResponsivePie
        /**
         * chart에 사용될 데이터
         */
        data={works.map((work) => ({
          id: work.id,
          value: Math.round((work.totalTime / totalMinutes) * 100),
          label: work.title,
        }))}
        valueFormat={(value) => `${Number(value)}%`}
        /**
         * chart margin
         */
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        /**
         * chart 중간 빈공간 반지름
         */
        innerRadius={0.5}
        /**
         * pad 간격
         */
        padAngle={0.7}
        /**
         * pad radius 설정 (pad별 간격이 있을 시 보임)
         */
        cornerRadius={3}
        /** */
        activeOuterRadiusOffset={8}
        /**
         * chart 색상
         */
        //colors={['red', 'aqua', 'orange']} // 커스터하여 사용할 때
        colors={{ scheme: "pastel2" }} // nivo에서 제공해주는 색상 조합 사용할 때
        /**
         * pad border 두께 설정
         */
        borderWidth={1}
        /** border color */
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        /**
         * link label skip할 기준 각도
         */
        arcLinkLabelsSkipAngle={10}
        /**
         * link label 색상
         */
        arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
        /**
         * link label 연결되는 선 두께
         */
        arcLinkLabelsThickness={2}
        /**
         * link label 연결되는 선 색상
         */
        arcLinkLabelsColor="white" // pad 색상에 따라감
        /**
         * label (pad에 표현되는 글씨) skip할 기준 각도
         */
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        theme={{
          /**
           * label style (pad에 표현되는 글씨)
           */
          labels: {
            text: {
              fontSize: 17,
              fill: "#000000",
            },
          },
        }}
        arcLinkLabel="label"
        /**
         * pad 클릭 이벤트
         */
        onClick={handle.padClick}
        /**
         * legend 설정 (default로 하단에 있는 색상별 key 표시)
         */
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 20,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#999",
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
}

export default PiechartDoneWorksDateRange
