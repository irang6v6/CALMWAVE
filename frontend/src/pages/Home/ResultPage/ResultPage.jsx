import styles from "./ResultPage.module.css"
import chart1 from "../../../assets/roomresultimg.png"
import React from "react"
// import { VscTriangleDown } from "react-icons/vsc"

function ResultPage(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      {props.scrollTrigger ? (
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
      ) : null}
    </div>
  )
}
export default ResultPage
