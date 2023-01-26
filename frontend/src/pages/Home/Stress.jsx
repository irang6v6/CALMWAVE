import styles from "./Stress.module.css"
import React from "react"
import angry from "../../assets/angry.png"

function Stress(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <h1>스트레스 관리</h1>
        <div className={`${styles["img-wrap"]}`}>
          <img src={angry} alt="임시이미지" />
          <img src={angry} alt="임시이미지" />
          <img src={angry} alt="임시이미지" />
        </div>
        <p className={`${styles["smile-text"]}`}>
          표정이 너무 안 좋아요, 잠시 리프레쉬 시간을 가져보는 것이 어떤가요?
        </p>
      </div>
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
        한 칸 아래로!
      </div>
    </div>
  )
}
export default Stress
