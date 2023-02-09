import { NavLink } from "react-router-dom"
import styles from "./NavIcon.module.css"
import {
  IoLogOut,
  IoPerson,
  IoSettingsSharp,
  IoPlay,
  IoPersonAdd,
} from "react-icons/io5"
import { AiTwotoneEdit } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
// import { AxiosLogout } from "../../store/user-slice"
import useApi from "../../hooks/http/use-api"
import { LOGOUTandRESETLOCALSTORAGE } from "../../store/token-slice"
import { SpinnerDots } from "../UI/Spinner"

function NavIcon() {
  const dispatch = useDispatch()
  const id = useSelector((state) => state.user.userData.id)
  const [isLogin, setIsLogin] = useState(
    id ? true : false || localStorage.getItem("Access") ? true : false
  )
  /* eslint-disable */
  const [logoutLoading, logoutError, logoutAxiosRequest] = useApi()
  useEffect(
    function () {
      setIsLogin(() =>
        id
          ? true
          : false ||
            (localStorage.getItem("Access") && localStorage.getItem("Refresh"))
          ? true
          : false
      )
    },
    [id]
  )
  const [openMenu, setOpenMenu] = useState(false)
  const openMenuHandler = function () {
    setOpenMenu((val) => !val)
  }
  const logout = function () {
    logoutAxiosRequest(
      {
        method: "get",
        url: "/v1/user/logout",
      },
      function () {
        dispatch(LOGOUTandRESETLOCALSTORAGE())
      }
    )
  }
  return (
    <>
      <NavLink to={`/`} className={`${styles[`logo-on-top`]}`}>
        CALM WAVE
      </NavLink>
      <div className={`${styles["nav-icon-container"]}`}>
        {logoutLoading ? (
          <SpinnerDots />
        ) : isLogin ? (
          <>
            <NavLink
              to={`/door`}
              className={
                openMenu
                  ? `${styles[`nav-icon-play`]} ${styles[`play-open`]}`
                  : `${styles[`nav-icon-play`]}`
              }
            >
              <div className={`${styles[`icon-description`]}`}>시작</div>
              <IoPlay className={`${styles[`nav-icon-sizing`]}`} />
            </NavLink>
            <NavLink
              to={`/door`}
              className={
                openMenu
                  ? `${styles[`nav-icon-door`]} ${styles[`door-open`]}`
                  : `${styles[`nav-icon-door`]}`
              }
            >
              <div className={`${styles[`icon-description`]}`}>업무 관리</div>
              <AiTwotoneEdit className={`${styles[`nav-icon-sizing`]}`} />
            </NavLink>
            <NavLink
              to={`/profile`}
              className={
                openMenu
                  ? `${styles[`nav-icon-profile`]} ${styles[`profile-open`]}`
                  : `${styles[`nav-icon-profile`]}`
              }
            >
              <div className={`${styles[`icon-description`]}`}>프로필</div>
              <IoPerson className={`${styles[`nav-icon-sizing`]}`} />
            </NavLink>
            <NavLink
              to={`/`}
              className={
                openMenu
                  ? `${styles[`nav-icon-logout`]} ${styles[`logout-open`]}`
                  : `${styles[`nav-icon-logout`]}`
              }
              onClick={logout}
            >
              <div className={`${styles[`icon-description`]}`}>로그아웃</div>
              <IoLogOut className={`${styles[`nav-icon-sizing`]}`} />
            </NavLink>
            <div
              className={`${styles[`nav-icon-set`]}`}
              onClick={openMenuHandler}
            >
              <div className={`${styles[`icon-description`]}`}>옵션</div>
              <IoSettingsSharp className={`${styles[`nav-icon-sizing`]}`} />
            </div>
          </>
        ) : (
          <>
            <NavLink to={`/sign`} className={`${styles[`nav-icon-sign`]}`}>
              <IoPersonAdd className={`${styles[`nav-icon-sign`]}`} />
              <div className={`${styles[`icon-description`]}`}>로그인</div>
            </NavLink>
          </>
        )}
      </div>
    </>
  )
}

export default NavIcon
