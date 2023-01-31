import styles from "./EnterPage.module.css"
import React from "react"
// import turtleImg from "../../../assets/blueturtle.png"
import { NavLink } from "react-router-dom"
import Logo from "../../../components/Logo/Logo"
import { AiFillPlayCircle, AiFillInfoCircle, AiFillEdit } from "react-icons/ai"

function EnterPage(props) {
  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <div className={`${styles["left-box"]}`}>
          <Logo />
        </div>

        <div className={`${styles["right-box"]}`}>
          <div className={`${styles["text-box"]}`}>
            <span className={`${styles[`slogun-kr`]}`}>
              조금씩 더 나아질 당신을 위해
            </span>
            <span className={`${styles[`slogun-en`]}`}>
              For You who will get better little by little
            </span>
            <div className={`${styles["icon-wrap"]}`}>
              <NavLink
                to={`/door`}
                className={`${styles[`shortcut-container`]}`}
              >
                <AiFillPlayCircle className={`${styles[`icons`]}`} />
                <span>START</span>
              </NavLink>
              <NavLink
                to={`/manage`}
                className={`${styles[`shortcut-container`]}`}
              >
                <AiFillEdit className={`${styles[`icons`]}`} />
                <span>TASKS</span>
              </NavLink>
              <NavLink
                to={`/profile`}
                className={`${styles[`shortcut-container`]}`}
              >
                <AiFillInfoCircle className={`${styles[`icons`]}`} />
                <span>PROFILE</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
        한 칸 아래로!
      </div>
    </div>
  )
}
export default EnterPage
