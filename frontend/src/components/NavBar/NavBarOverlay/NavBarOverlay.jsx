import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "./NavBarOverlay.module.css"

function NavBarOverlay(props) {
  // const [isVisible, setIsVisible] = useState(false)
  const [dropboxClasses, setDropboxclasses] = useState(
    `${styles["dropbox-container"]}`
  )
  useEffect(
    function () {
      const classes = props.isVisible
        ? `${styles["dropbox-container"]} ${styles["ishover"]}`
        : `${styles["dropbox-container"]}`
      setDropboxclasses(() => classes)
    },
    [props.isVisible]
  )
  // useEffect(function() {}, [props.menuList]) // 메뉴 리스트를 주면 호버메뉴를 만들어준다.
  return (
    <div className={` ${dropboxClasses}`}>
      <NavLink to={`/profile/userinfo`} className={`${styles["dropbox-item"]}`}>
        내 정보
      </NavLink>
      <NavLink to={`/profile/graph`} className={`${styles["dropbox-item"]}`}>
        그래프
      </NavLink>
      <NavLink to={`/profile/router3`} className={`${styles["dropbox-item"]}`}>
        라우터3
      </NavLink>
      <NavLink to={`/profile/router4`} className={`${styles["dropbox-item"]}`}>
        라우터4
      </NavLink>
    </div>
  )
}

export default NavBarOverlay
