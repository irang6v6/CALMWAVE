import { NavLink, useNavigate } from "react-router-dom"
import CwLogoImg from "../../../assets/calmWave2.png"
import styles from "./SideNav.module.css"

function SideNav(props) {
  const navigate = useNavigate()
  const pushHome = function () {
    navigate(`/mini/profile`)
  }
  return (
    <div className={`${styles["mypageRouter"]}`}>
      <img
        className={`${styles["logoimg"]}`}
        src={CwLogoImg}
        alt="calmwave logo"
        onClick={pushHome}
      />
      <NavLink
        to={`/profile/userinfo` || `/profile`}
        className={({ isActive }) =>
          isActive || props.infoType === undefined
            ? `${styles[`router`]} ${styles[`active`]}`
            : styles[`router`]
        }
      >
        userinfo
      </NavLink>
      <NavLink
        to={`/profile/graph`}
        className={({ isActive }) =>
          isActive
            ? `${styles[`router`]} ${styles[`active`]}`
            : styles[`router`]
        }
      >
        graph
      </NavLink>
      <NavLink
        to={`/profile/router3`}
        className={({ isActive }) =>
          isActive
            ? `${styles[`router`]} ${styles[`active`]}`
            : styles[`router`]
        }
      >
        Router3
      </NavLink>
      <NavLink
        to={`/profile/router4`}
        className={({ isActive }) =>
          isActive
            ? `${styles[`router`]} ${styles[`active`]}`
            : styles[`router`]
        }
      >
        Router4
      </NavLink>
    </div>
  )
}

export default SideNav
