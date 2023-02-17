import React, { useState } from "react"
import PiechartDoneWorksToday from "./PiechartDoneWorksToday"
import PiechartDoneWorksDateRange from "./PiechartDoneWorksDateRange"
import Dropdown from "./Dropdown"

const options = ["오늘", "이번주", "이번달"]

function DoneWorksVisualization({ className }) {
  const [selectedOption, setSelectedOption] = useState(options[0])

  const handleOptionChange = (option) => {
    setSelectedOption(option)
  }

  return (
    <>
      <div>
        <Dropdown options={options} onOptionChange={handleOptionChange} />
        <div className="piechart">
          {/*오늘(오늘 새벽 4시~내일 새벽 4시) 기준 끝낸 업무 파이차트*/}
          {selectedOption === "오늘" && <PiechartDoneWorksToday />}
          {/*이번주(일요일 새벽 4시 ~ 다음주 일요일 새벽 4시) 기준 끝낸 업무 파이차트*/}
          {selectedOption === "이번주" && (
            <PiechartDoneWorksDateRange selected="이번주" />
          )}
          {/*이번달(이번달 1일 새벽 4시 ~ 다음달 1일 새벽 4시) 기준 끝낸 업무 파이차트*/}
          {selectedOption === "이번달" && (
            <PiechartDoneWorksDateRange selected="이번달" />
          )}
        </div>
      </div>
    </>
  )
}

export default DoneWorksVisualization
