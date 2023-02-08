/* eslint-disable */
import Calendar from "react-calendar"
import styles from "./MyCalendar.css"
import React, { useState } from "react"
import moment from "moment"
import { useSelector } from "react-redux"

export default function CalendarInfo({ todo }) {
  console.log(todo?.title)

  // const daysRemaining = moment(date).diff(moment().format("YYYY-MM-DD"), "day");
  // let dDayLabel = "D";
  // if (daysRemaining === 0) {
  //   dDayLabel += "-Day";
  // } else if (daysRemaining <= 0) {
  //   dDayLabel += `-${-daysRemaining}`;
  // } else {
  //   dDayLabel += `+${daysRemaining}`;
  // }

  //   const selectDay = (selectedDate) => {
  //     return todolist
  //       .filter((todo) => todo.createdDate === selectedDate)
  //       .map((todo, index) =>
  //       <div key={todo.id}>{todo.title}<br/>{todo.finishedDate}</div>
  //       )
  //   }

  return <div className="todo-box"> 
    <div className="todo-content">
      <b>▶ {todo?.title}</b> &nbsp; <br/>
      {todo?.description}<br/>
      <br/>
      목표일자 : {todo?.finishedDate}
    </div>
      <p>
      카테고리: {todo?.categoryId}
      </p>
  </div>
}
