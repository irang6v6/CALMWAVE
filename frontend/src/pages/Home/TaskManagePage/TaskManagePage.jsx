import styles from "./TaskManagePage.module.css"
import React from "react"
import todoList from "../../../assets/todolist.png"

function TaskManagePage(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <div className={`${styles["img-wrap"]}`}>
          <img src={todoList} alt="임시이미지" />
        </div>
        <div className={`${styles["text-wrap"]}`}>
          <h1>업무 시간을 편하게 관리</h1>
          <p>
            업무 누적 시간을 한 눈에 확인할 수 있어요. 업무 누적 시간을 한 눈에
            확인할 수 있어요. <br />
            업무 누적 시간을 한 눈에 확인할 수 있어요. 업무 누적 시간을 한 눈에
            확인할 수 있어요. 업무 누적 시간을 한 <br />
            업무 누적 시간을 한 눈에 확인할 수 있어요{" "}
          </p>
        </div>
      </div>
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
        한 칸 아래로!
      </div>
    </div>
  )
}
export default TaskManagePage
