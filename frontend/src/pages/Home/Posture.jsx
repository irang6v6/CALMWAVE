import styles from "./Posture.module.css"
import React from "react"
import { VscTriangleDown } from "react-icons/vsc"

function Posture(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <p className={`${styles["header-text"]}`}>My Calendar를 통해 한 눈에 확인하는 나의 업무 일정</p>
      </div>
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
      <VscTriangleDown className={`${styles[`go-down-icon`]}`} />
      </div>
    </div>
  )
}
export default Posture
