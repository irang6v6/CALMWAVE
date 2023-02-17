import Calendar from "react-calendar"
/* eslint-disable */
import styles from "./MyCalendar.css"
import React, { useState, useEffect } from "react"
import moment from "moment"
import { useSelector, useDispatch } from "react-redux"
import CalendarInfo from "./CalendarInfo"
// import { BsPlusLg } from "react-icons/bs"
import { modalActions } from "../../store/door-store/modal-slice"
import { openTaskModal } from "../../store/door-store/modal-slice"
import { AxiosGetCalendar, calendarActions } from "../../store/calendar-slice"

export default function MyCalendar(props) {
  const dispatch = useDispatch()
  const [date, setDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState(new Date())
  const selectedDate = moment(date)

  // 리덕스에 있는 todolist데이터 가져오기
  // const todolist = useSelector((state) => state.calendar.taskList)
  const {
    taskList: todolist,
    isLoading,
    isError,
    selectedDate: RTKSelectedDate,
  } = useSelector((state) => state.calendar)
  useEffect(
    function () {
      const d = new Date(selectedDate)
      dispatch(
        calendarActions.changeDate(
          `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
        )
      )
    },
    [selectedDate, dispatch, calendarActions]
  )
  useEffect(
    function () {
      if (RTKSelectedDate) {
        const a = RTKSelectedDate.split("-")
        dispatch(AxiosGetCalendar(a[0], a[1], a[2]))
      }
    },
    [RTKSelectedDate, dispatch]
  )


  // 투두 생성 모달
  const openCreateTaskModal = function () {
    dispatch(modalActions.resetFormData())
    dispatch(modalActions.setIsCreate())
    dispatch(openTaskModal())
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
            moment(date).format("DD")
          }
          tileClassName={({ date }) => {
            // 토요일: 파란색, 일요일: 빨간색
            if (moment(date).format("LLLL").split(",")[0] === "Saturday") {
              return "highlight-saturday"
            } else if (moment(date).format("LLLL").split(",")[0] === "Sunday") {
              return "highlight-sunday"
            }
          }}
        />

        <div className="right-box">
          <div className="select-date-wrap">
            {/* 선택한 날짜 */}
            <div className="select-date">
              {moment(date).format("YYYY년 MM월 DD일")}
            </div>
          </div>

          {/* 선택한 날짜의 투두리스트 */}
          <div className="select-todolist">
            {todolist && todolist.length > 0 ? (
              todolist.map((todo, index) => (
                <CalendarInfo
                  key={`calendar-task-${todo.id}-${Math.random()}`}
                  todo={todo}
                  date={date}
                />
              ))
            ) : (
              <div className="nowork-text">등록된 업무가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}