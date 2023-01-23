import styles from "./Stretching.module.css"
import React from "react"

function Stretching() {
  return (
    <div className={`${styles["container"]}`}>
        <div className={`${styles["inner"]}`}>
        <div className={`${styles["left-box"]}`}>
            <div className={`${styles["stretching-timeset"]}`}>
                <h1>스트레칭 알림 받을 시간</h1>
                <span>-</span>
                <span>50분 간격</span>
                <span>+</span>
            </div>
        </div>

        <div className={`${styles["right-box"]}`}>
            <div className={`${styles["mode-wrap"]}`}>
            <div className={`${styles["silent-mode"]}`}>
                <h3>무음모드</h3>
                <div className={`${styles["inner-box"]}`}>
                    <p>스트레칭 할 시간입니다.</p>
                    <div className={`${styles["close-btn"]}`}>닫기</div>
                </div>
            </div>

            <div className={`${styles["mission-mode"]}`}>
                <h3>소리모드</h3>
                <div className={`${styles["inner-box"]}`}>
                    <p>스트레칭 할 시간입니다.<br/>
                    일어나서 스트레칭을 해주세요</p>
                </div>
            </div>
        </div> 
        </div>
        </div> 
    </div>
  )
}
export default Stretching