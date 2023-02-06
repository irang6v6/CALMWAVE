import styles from "./Stretching.module.css"
import chart1 from "../../assets/chart1.png"
import chart2 from "../../assets/chart2.png"
import chart3 from "../../assets/chart3.png"
import React from "react"
import { VscTriangleDown } from "react-icons/vsc"

function Stretching(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <h2>결과페이지에서 확인할 수 있는 다양한 나의 기록</h2>
        <div className={`${styles["chart-wrap"]}`}>
          <div className={`${styles["chart"]}`}><img src={chart1} alt="차트1"/>
            <p>이번 주 목표 달성도</p>
          </div>
          <div className={`${styles["chart"]}`}><img src={chart2} alt="차트2"/>
          <p>이번 주 목표 달성도</p>
          </div>
          <div className={`${styles["chart"]}`}><img src={chart3} alt="차트3"/>
          <p>이번 주 목표 달성도</p>
          </div>
        </div>
      </div>
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
      <VscTriangleDown className={`${styles[`go-down-icon`]}`} />
      </div>
    </div>
  )
}
export default Stretching
