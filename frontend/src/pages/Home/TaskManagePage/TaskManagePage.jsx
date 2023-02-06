import styles from "./TaskManagePage.module.css"
import React from "react"
import alertimg from "../../../assets/alert.png"
import cuteturtle from "../../../assets/cuteturtle.png"
import stretching from "../../../assets/stretching.png"
import angryface from "../../../assets/angryface.png"
import { VscTriangleDown } from "react-icons/vsc"

function TaskManagePage(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <div className={`${styles["left-box"]}`}>
          <img src={alertimg} alt="알림 이미지" className={`${styles["alert-img"]}`}/>
        </div>
        <div className={`${styles["right-box"]}`}>
          <div className={`${styles["icon-wrap"]}`}>
            <img src={cuteturtle} alt="거북이 아이콘" className={`${styles["turtle-img"]}`}/>
            <img src={stretching} alt="스트레칭 아이콘" className={`${styles["stretcing-img"]}`}/>
            <img src={angryface} alt="화난얼굴 아이콘" className={`${styles["angry-img"]}`}/>
          </div>
          <div className={`${styles["alert-wrap"]}`}>
            <div className={`${styles["alert-box"]}`}>그러다 거북이가 친구하자 하겠어요</div>
            <div className={`${styles["alert-box"]}`}>허리피자 허리 수술  6000만원</div>
            <div className={`${styles["alert-box"]}`}>스트레칭 할 시간이예요 ~</div>
            <div className={`${styles["alert-box"]}`}>썩은 표정! 잠시 쉬어가요</div>
          </div>
        </div>
      </div>
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
      <VscTriangleDown className={`${styles[`go-down-icon`]}`} />
      </div>
    </div>
  )
}
export default TaskManagePage
