import { NavLink } from "react-router-dom"
import CwLogoImg from "../../../assets/calmWave2.png"
import styles from "./SideNav.module.css"

function SideNav(props) {
  console.log(props)
  return (
    <div className={`${styles["mypageRouter"]}`}>
      <a href="/profile">
        <img
          className={`${styles["logoimg"]}`}
          src={CwLogoImg}
          alt="calmwave logo"
        />
      </a>
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
