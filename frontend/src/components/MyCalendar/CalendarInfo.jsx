/* eslint-disable */
import Calendar from "react-calendar"
import styles from "./MyCalendar.css"
import React, { useState } from "react"
import moment from "moment"
import { useSelector, useDispatch } from "react-redux"
import CardHeader from "../UI/CardHeader/CardHeader"
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai"
import {
  modalActions,
  openCategoryModal,
  openCategoryDeleteModal,
  openTaskDeleteModal,
  openTaskModal,
} from "../../store/door-store/modal-slice"

export default function CalendarInfo({ todo, date }) {
  const dispatch = useDispatch()

  // 업무 목표날짜
  const finalDate = todo.dateAimed ? todo.dateAimed.slice(0, 10) : ""

  // 스토리포인트 계산
  // const storyPoints = todo.timeAimed / 3600

  // 캘린더에서 선택한 날짜
  const selectDate = moment(date)

  // 디데이 계산 (목표로 설정한 날짜 - 캘린더에서 선택한 날짜)
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

  // 삭제모달 호출
  const openDeleteModal = function () {
    // console.log(todo)
    const editedData = {
      id: todo.workId,
      title: todo.title,
      description: todo.description,
      categoryId: todo.workCateId,
      finishedDate: todo.dateAimed,
      storyPoint: todo.timeAimed,
    }
    dispatch(modalActions.setFormData({ data: editedData }))
    dispatch(openTaskDeleteModal())
  }

  // 수정 모달 호출
  const openModal = function () {
    const editedData = {
      id: todo.workId,
      title: todo.title,
      description: todo.description,
      categoryId: todo.workCateId,
      finishedDate: todo.dateAimed,
      storyPoint: todo.timeAimed,
    }
    dispatch(modalActions.setFormData({ data: editedData }))
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
        <b>▶ {todo?.title}</b>
        <br />
        세부내용 : {todo?.description}
        <br />
        <br />
        {/* 생성일자 : {todo?.dateCreated}<br/> */}
        {/* 목표시간 : {storyPoints}<br/> */}
        목표시간 :{" "}
        {todo?.timeAimed ? parseInt(todo?.timeAimed / 3600) : "미지정"}
        <br />
        {/* 목표일자 : {finalDate? `${finalDate} (${dDayLabel})`:`없음`} <br/> */}
        카테고리: {todo?.cateName}
        <br />
        {todo?.status === "DONE" ? (
          <span>완료된 업무</span>
        ) : (
          <span>
            목표일자 : {finalDate ? `${finalDate} (${dDayLabel})` : `없음`}
          </span>
        )}
      </div>

      <div className="card-header-icon-container">
        <AiFillEdit className="card-header-icon" onClick={openModal} />
        <AiFillCloseCircle
          className="card-header-icon"
          onClick={openDeleteModal}
        />
      </div>
    </div>
  )
}
