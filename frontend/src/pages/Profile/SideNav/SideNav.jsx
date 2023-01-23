import { NavLink } from "react-router-dom"
import "./SideNav.css"
import CwLogoImg from "../../../assets/calmWave2.png"

function SideNav() {
  return (
    <div className="mypageRouter">
      <a href="#none">
        <img className="logoimg" src={CwLogoImg} alt="calmwave logo" />
      </a>
      <NavLink
        to={`/profile/userinfo`}
        className={({ isActive }) => (isActive ? `router active` : `router`)}
      >
        userinfo
      </NavLink>
      <NavLink
        to={`/profile/graph`}
        className={({ isActive }) => (isActive ? `router active` : `router`)}
      >
        graph
      </NavLink>
      <NavLink
        to={`/profile/router3`}
        className={({ isActive }) => (isActive ? `router active` : `router`)}
      >
        Router3
      </NavLink>
      <NavLink
        to={`/profile/router4`}
        className={({ isActive }) => (isActive ? `router active` : `router`)}
      >
        Router4
      </NavLink>
    </div>
  )
}

export default SideNav
