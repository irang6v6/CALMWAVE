import styles from "./ResultPage.module.css"
import chart1 from "../../../assets/roomresultimg.png"
import chart2 from "../../../assets/chart2.png"
import chart3 from "../../../assets/chart3.png"
import React from "react"
// import { VscTriangleDown } from "react-icons/vsc"

function ResultPage(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <p className={`${styles["header-text"]}`}>
          결과페이지에서 확인할 수 있는 다양한 나의 기록
        </p>
        <div className={`${styles["chart-wrap"]}`}>
          <div className={`${styles["chart"]}`}>
            <img src={chart1} alt="차트1" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ResultPage
