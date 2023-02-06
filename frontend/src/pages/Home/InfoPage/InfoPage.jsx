import styles from "./InfoPage.module.css"
import React from "react"
import doorImg from "../../../assets/door.png"
import { VscTriangleDown } from "react-icons/vsc"

function InfoPage(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <p>
        최고의 성과를 달성하기 위한 나만의 업무 공간<br/>
        이제껏 경험 못 했던 체계적이고 편리한 업무 관리 서비스
        </p>
        <div>
          <img src={doorImg} alt="룸페이지 이미지" className={`${styles["door-img"]}`}/>
        </div>
      </div>
        <div className={`${styles["go-down"]}`} onClick={props.goNext}>
        <VscTriangleDown className={`${styles[`go-down-icon`]}`} />
        </div>
    </div>
  )
}
export default InfoPage
