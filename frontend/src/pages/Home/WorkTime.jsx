import styles from "./WorkTime.module.css"
import React from "react"
import workTime from "../../assets/worktime.png"

function WorkTime(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <div className={`${styles["text-wrap"]}`}>
          <h1>업무 시간을 편하게 관리</h1>
          <p>
            업무 누적 시간을 한 눈에 확인할 수 있어요. 업무 누적 시간을 한 눈에
            확인할 수 있어요. <br />
            업무 누적 시간을 한 눈에 확인할 수 있어요. 업무 누적 시간을 한 눈에
            확인할 수 있어요. 업무 누적 시간을 한 업무 누적 시간을 한 눈에
            확인할 수 있어요{" "}
          </p>
        </div>
        <div className={`${styles["img-wrap"]}`}>
          <img src={workTime} alt="임시이미지" />
        </div>
      </div>
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
        한 칸 아래로!
      </div>
    </div>
  )
}
export default WorkTime
