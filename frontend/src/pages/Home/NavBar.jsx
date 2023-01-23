import styles from "./NavBar.module.css"
import React from "react"
import logoImg from "../../assets/calmwave.png"

function NavBar() {
  return (
    <header>
        <div className={`${styles["logo-box"]}`}>
        <a href="#none"><img src={logoImg} className={`${styles["logo-img"]}`} alt="calmwave-logo"/></a>
        </div>

        <div className={`${styles["menu-box"]}`}>
            <a href="#none">HOME</a>
            <a href="#none">LOGIN</a>
            <a href="#none">SIGNUP</a>
        </div>

    </header>
  )
}
export default NavBar
 