import Calendar from "react-calendar"
/* eslint-disable */
import styles from "./MyCalendar.css"
import React, { useState, useEffect } from "react"
import moment from "moment"
import { useSelector, useDispatch } from "react-redux"
import CalendarInfo from "./CalendarInfo"
import { BsPlusLg } from "react-icons/bs"
import { modalActions } from "../../store/door-store/modal-slice"
import { openTaskModal } from "../../store/door-store/modal-slice"

export default function MyCalendar(props) {
  const dispatch = useDispatch()
  const [date, setDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState(new Date())

  const todolist = useSelector((state) => state.task.taskList)
  console.log(todolist, "<<<<")

  const openCreateTaskModal = function () {
    dispatch(modalActions.resetFormData())
    dispatch(modalActions.setIsCreate())
    dispatch(openTaskModal())
  }

  // const setCalendar = () => {
  //   console.log(selectedDate)
  //   (moment(date).format("YYYY-MM-DD"))
  //   if (todolist) {
  //     return
  //   }
  // }

  // return todolist
  //   .filter((todo) => todo.createdDate === selectedDate)
  //   .map((todo, index) =>
  //   <div key={todo.id}>{todo.title}<br/>{todo.finishedDate}</div>
  //   )
  // }

  // const setCalendar = (selectedDate) => {
  //   console.log(selectedDate)
  //   return  todolist
  //     .filter((todo) => todo.createdDate <= selectedDate <= todo.finishedDate)
  //     .map((todo, index) => (
  //       <CalendarInfo
  //         key={todo.id}
  //         todo={todo}
  //         />
  //     ))

  // return todolist
  //   .filter((todo) => todo.createdDate === selectedDate)
  //   .map((todo, index) =>
  //   <div key={todo.id}>{todo.title}<br/>{todo.finishedDate}</div>
  //   )

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
              // console.log(todolist)
              return "highlight-sunday"
            }
          }}
        />

        <div className="right-box">
          <div className="select-date-wrap">
            <div className="select-date">
              {moment(date).format("YYYY년 MM월 DD일")}
            </div>
          </div>

          <div className="select-todolist">
            {todolist
              ? todolist
                  .filter(
                    (todo) =>
                      todo?.createdDate?.slice(0, 10) ===
                      moment(date).format("YYYY-MM-DD")
                  )
                  .map((todo, index) => (
                    <CalendarInfo
                      key={`calendar-task-${todo.id}-${Math.random()}`}
                      todo={todo}
                      date={date}
                    />
                  ))
              : null}
          </div>

          <div
            className={`${styles[`create-task`]}`}
            onClick={openCreateTaskModal}
          >
            <BsPlusLg className={`${styles[`play-icon`]}`} />
          </div>

          


        </div>
      </div>
    </div>
  )
}
