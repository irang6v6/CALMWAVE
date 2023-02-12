import styles from "./Stress.module.css"
import { NavLink } from "react-router-dom"
import React from "react"
import startbtn from "../../assets/last_start.png"
import mypagebtn from "../../assets/last_mypage.png"
// import { VscTriangleDown } from "react-icons/vsc"

function Stress(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <h1>CALM WAVE 시작하기</h1>
        <div className={`${styles["img-wrap"]}`}>
          <NavLink to={`/door`} className={`${styles[`shortcut-container`]}`}>
            {/* <AiFillPlayCircle className={`${styles[`icons`]}`} /> */}
            <img
              src={startbtn}
              alt="룸 입장"
              className={`${styles[`enter-btn`]}`}
            />
          </NavLink>

          <NavLink
            to={`/profile`}
            className={`${styles[`shortcut-container`]}`}
          >
            {/* <AiFillInfoCircle className={`${styles[`icons`]}`} /> */}
            <img src={mypagebtn} alt="마이페이지" className={`${styles[`mypage-btn`]}`}/>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
export default Stress
