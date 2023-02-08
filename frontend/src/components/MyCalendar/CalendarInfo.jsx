/* eslint-disable */
import Calendar from "react-calendar"
import styles from "./MyCalendar.css"
import React, { useState } from "react"
import moment from "moment"
import { useSelector } from "react-redux"

export default function CalendarInfo({ todo, date }) {
  // console.log(todo?.title)
  // const [date, setDate] = useState(new Date())
  const finalDate = todo.finishedDate
  const selectDate = moment(date)
  // console.log(finalDate)
  // console.log(selectDate)
  // console.log(selectDate.diff(moment(finalDate).format("YYYY-MM-DD"), "day"))
  // console.log(moment(finalDate).format("YYYY-MM-DD"))
  // console.log(moment(date).format("YYYY-MM-DD"))
  // console.log(moment(date).diff(moment(finalDate).format("YYYY-MM-DD"), "day"))
  // console.log(moment(finalDate).diff(moment(date).format("YYYY-MM-DD"), "day"))
  // console.log(todo)

  // const daysRemaining = moment(date).diff(moment(finalDate).format("YYYY-MM-DD"), "day");
  const daysRemaining = selectDate.diff(moment(finalDate).format("YYYY-MM-DD"), "day");
  let dDayLabel = "D";
  if (daysRemaining === 0) {
    dDayLabel += "-Day";
  } else if (daysRemaining <= 0) {
    dDayLabel += `-${-daysRemaining}`;
  } else {
    dDayLabel += `+${daysRemaining}`;
  }

  //   const selectDay = (selectedDate) => {
  //     return todolist
  //       .filter((todo) => todo.createdDate === selectedDate)
  //       .map((todo, index) =>
  //       <div key={todo.id}>{todo.title}<br/>{todo.finishedDate}</div>
  //       )
  //   }

  return (
    <div className="todo-box">
      <div className="todo-content">
        <b>▶ {todo?.title}</b> &nbsp; <br />
        {todo?.description}
        <br />
        <br />
        목표일자 : {todo?.finishedDate} &nbsp; ({dDayLabel})
      </div>
      <p>카테고리: {todo?.categoryId}</p>
      
    </div>
  )
}
