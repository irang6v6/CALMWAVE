import styles from "./LastPage.module.css"
import React from "react"
import startbtn from "../../assets/startbtn.png"
import mypagebtn from "../../assets/mypagebtn.png"
import { NavLink } from "react-router-dom"

function LastPage(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
        <div className={`${styles["inner"]}`}>
            <div className={`${styles["small-title"]}`}>
                <h1>Calm Wave 시작하기</h1>
            </div>

            <div className={`${styles["btn-img-wrap"]}`}>
                    <NavLink to={`/door`} className={`${styles["startbtn-wrap"]}`}>
                    <img src={startbtn} alt="start" />
                    <h3>시작</h3>
                    </NavLink>

                    <NavLink to={`/profile`} className={`${styles["mypagebtn-wrap"]}`}>
                    <img src={mypagebtn} alt="mypage" />
                    <h3>내 정보</h3>
                    </NavLink>
            </div>
        </div>
    </div>
  )
}
export default LastPage
