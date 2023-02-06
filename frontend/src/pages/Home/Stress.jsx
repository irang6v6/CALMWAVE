import styles from "./Stress.module.css"
import React from "react"
import startbtn from "../../assets/start-btn.png"
import mypagebtn from "../../assets/mypage-btn.png"

function Stress(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <h1>CALM  WAVE 시작하기</h1>
        <div className={`${styles["img-wrap"]}`}>
          <img src={startbtn} alt="임시이미지" />
          <img src={mypagebtn} alt="임시이미지" />
        </div>
      </div>
    </div>
  )
}
export default Stress
