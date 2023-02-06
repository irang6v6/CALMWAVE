import styles from "./Posture.module.css"
import React from "react"
import turtleneck from "../../assets/turtleneck.png"
import cuteturtle from "../../assets/cuteturtle.png"

function Posture(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <h2>My Calendar를 통해 한 눈에 확인하는 나의 업무 일정</h2>
      </div>
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
        한 칸 아래로!
      </div>
    </div>
  )
}
export default Posture
