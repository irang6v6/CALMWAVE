import Calendar from "react-calendar"
/* eslint-disable */
import styles from "./MyCalendar.css"
import React, { useState } from "react"
import moment from "moment"
import { useSelector } from "react-redux"
import CalendarInfo from "./CalendarInfo"

export default function MyCalendar() {
  const [date, setDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState(new Date())

  const todolist = useSelector((state) => (state.task.taskList))

  const daysRemaining = moment(date).diff(moment().format("YYYY-MM-DD"), "day");
  let dDayLabel = "D";
  if (daysRemaining === 0) {
    dDayLabel += "-Day";
  } else if (daysRemaining <= 0) {
    dDayLabel += `-${-daysRemaining}`;
  } else {
    dDayLabel += `+${daysRemaining}`;
  }

  const setCalendar = (selectedDate) => {
    console.log(selectedDate)
    return  todolist
      .filter((todo) => todo.createdDate === selectedDate)
      .map((todo, index) => (
        <CalendarInfo
          key={todo.id}
          todo={todo}
          />
      ))
    
    // return todolist
    //   .filter((todo) => todo.createdDate === selectedDate)
    //   .map((todo, index) =>
    //   <div key={todo.id}>{todo.title}<br/>{todo.finishedDate}</div>
    //   )
  }


  return (
    <div className="MyCalendar">
      <div className="calender-container">
        <Calendar
          className="react-calendar"
          onChange={setDate}
          value={date}
          // 일요일 먼저
          calendarType="Hebrew"
          // 연도 못보게
          minDetail="month"
          // 이전, 다음달 못보게
          maxDetail="month"
          showNeighboringMonth={false}
          // 달력에 '일' 빼는 코드
          formatDay={(locale, date) =>
            // date.toLocaleString("en", { day: "numeric" })
            moment(date).format("DD")
          }

          tileClassName={({ date }) => {
          // 토요일: 파란색, 일요일: 빨간색
          if (moment(date).format("LLLL").split(",")[0] === "Saturday") {
            return "highlight-saturday"
          } else if (moment(date).format("LLLL").split(",")[0] === "Sunday") {
            console.log(todolist)
            return "highlight-sunday"
          }}}
        />

        <div className="select-date-wrap">
          <div className="select-date">
            {moment(date).format("YYYY년 MM월 DD일")}
          </div>
          <div className="select-todolist">
            {setCalendar(moment(date).format("YYYY-MM-DD"))}
            <br />
          {dDayLabel}
          </div>
        </div>
      </div>
    </div>
  )
}
