import styles from "./Posture.module.css"
import React from "react"
import turtleneck from "../../assets/turtleneck.png"
import cuteturtle from "../../assets/cuteturtle.png"

function Posture(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <div className={`${styles["left-box"]}`}>
          <div className={`${styles["alert-box"]}`}>
            <p>자리를 비우셨네요 어서 돌아오세요 !</p>
          </div>
          <img
            src={cuteturtle}
            className={`${styles["turtle-img"]}`}
            alt="임시이미지"
          />
        </div>

        <div className={`${styles["right-box"]}`}>
          <div className={`${styles["alert-box"]}`}>
            <p>그러다간 거북이가 친구하자 하겠어요 !</p>
          </div>
          <img
            src={turtleneck}
            className={`${styles["turtle-img"]}`}
            alt="임시이미지"
          />
        </div>
      </div>
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
        한 칸 아래로!
      </div>
    </div>
  )
}
export default Posture
