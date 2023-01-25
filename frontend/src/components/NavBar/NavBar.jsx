import styles from "./NavBar.module.css"
import React from "react"
import logoImg from "../../assets/calmwave.png"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../store/user-slice"

function NavBar() {
  const isLogin = useSelector((state) => state.user.isLogin)
  const dispatch = useDispatch()
  const toggleLogin = function () {
    dispatch(userActions.updateLogin())
  }
  return (
    <div className={`${styles["header-container"]}`}>
      <div className={`${styles["logo-box"]}`}>
        <a href="/">
          <img
            src={logoImg}
            className={`${styles["logo-img"]}`}
            alt="calmwave-logo"
          />
        </a>
      </div>
      <div className={`${styles["menu-box"]}`}>
        <NavLink to="/" className={`${styles["navbar-item"]}`}>
          HOME
        </NavLink>
        {!isLogin ? (
          <NavLink to="/sign" className={`${styles["navbar-item"]}`}>
            LOGIN SIGNUP
          </NavLink>
        ) : (
          <div>ㅎㅇ</div>
        )}
        <div onClick={toggleLogin}>인앤아웃</div>

        {/* <NavLink to="/sign" className={`${styles["navbar-item"]}`}>
          SIGNUP
        </NavLink> */}
      </div>
    </div>
  )
}
export default NavBar
