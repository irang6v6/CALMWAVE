/* eslint-disable */
import Calendar from "react-calendar"
import styles from "./MyCalendar.css"
import React, { useState } from "react"
import moment from "moment"
import { useSelector, useDispatch } from "react-redux"
import CardHeader from "../UI/CardHeader/CardHeader"
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai"
import { modalActions,
        openCategoryModal,
        openCategoryDeleteModal,
        openTaskDeleteModal,
        openTaskModal,
} from "../../store/door-store/modal-slice"


export default function CalendarInfo({ todo, date }) {
  const dispatch = useDispatch()
  // console.log(todo?.title)
  // const [date, setDate] = useState(new Date())
  const finalDate = todo.finishedDate ? todo.finishedDate.slice(0, 10) : ""
  const selectDate = moment(date)

  // const daysRemaining = moment(date).diff(moment(finalDate).format("YYYY-MM-DD"), "day");
  const daysRemaining = selectDate.diff(
    moment(finalDate).format("YYYY-MM-DD"),
    "day"
  )
  let dDayLabel = "D"
  if (daysRemaining === 0) {
    dDayLabel += "-Day"
  } else if (daysRemaining <= 0) {
    dDayLabel += `-${-daysRemaining}`
  } else {
    dDayLabel += `+${daysRemaining}`
  }

  const openDeleteModal = function () {
      dispatch(modalActions.setFormData({ data:todo }))
      dispatch(openTaskDeleteModal())
  }

  const openModal = function () {
    dispatch(modalActions.setFormData({ data:todo }))
      dispatch(modalActions.setIsTask())
      dispatch(modalActions.setIsUpdate())
      dispatch(openTaskModal())
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
      {/* <CardHeader data={todo} cardType={true} /> */}
      <div className="todo-content">
        <b>▶ {todo?.title}</b> &nbsp; <br />
        {todo?.description}
        <br />
        <br />
        목표일자 : {finalDate? `${finalDate} (${dDayLabel})`:`없음`}
      </div>
      <p>카테고리: {todo?.categoryId}</p>

      <div className={`${styles[`card-header-icon-container`]}`}>
        <AiFillEdit
          className={`${styles[`card-header-icon`]}`}
          onClick={openModal}
        />
        <AiFillCloseCircle
          className={`${styles[`card-header-icon`]}`}
          onClick={openDeleteModal}
        />
      </div>

    </div>
  )
}
