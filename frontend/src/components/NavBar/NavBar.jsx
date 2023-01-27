import styles from "./NavBar.module.css"
import React, { useState } from "react"
import logoImg from "../../assets/calmwave.png"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../store/user-slice"
import NavUserShortcut from "./NavUserShortcut/NavUserShortcut"
import NavBarOverlay from "./NavBarOverlay/NavBarOverlay"

function NavBar() {
  const navigate = useNavigate()
  const isLogin = useSelector((state) => state.user.isLogin)
  const dispatch = useDispatch()
  const [userShortcutMouseIn, setUserShortcutMouseIn] = useState(false)
  const toggleLogin = function () {
    dispatch(userActions.updateLogin())
  }
  const toggleUserShortcutMouseIn = function () {
    setUserShortcutMouseIn((val) => !val)
  }
  const pushHome = function () {
    navigate(`/`)
  }
  const pushProfile = function () {
    navigate(`/profile`)
  }
  return (
    <div className={`${styles["header-container"]}`}>
      <div className={`${styles["logo-box"]}`}>
        <img
          src={logoImg}
          className={`${styles["logo-img"]}`}
          alt="calmwave-logo"
          onClick={pushHome}
        />
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
          <div
            onMouseEnter={toggleUserShortcutMouseIn}
            onMouseLeave={toggleUserShortcutMouseIn}
          >
            <NavUserShortcut
              className={`${styles["navbar-item"]}`}
              onClick={pushProfile}
            />
            <NavBarOverlay isVisible={userShortcutMouseIn} />
          </div>
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
