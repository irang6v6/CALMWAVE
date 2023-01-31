import styles from "./Logo.module.css"
import LogoImg from "../../assets/gologo.png"

function Logo() {
  return (
    <div className={`${styles["logo-container"]}`}>
      <img alt="Logo" src={LogoImg} className={`${styles["logo-img"]}`} />
      <div>
        <span className={`${styles["logo-calm"]}`}>C</span>
        <span className={`${styles["logo-calm"]}`}>a</span>
        <span className={`${styles["logo-calm"]}`}>l</span>
        <span className={`${styles["logo-calm"]}`}>m </span>
        <span className={`${styles["logo-wave"]}`}>W</span>
        <span className={`${styles["logo-wave"]}`}>a</span>
        <span className={`${styles["logo-wave"]}`}>v</span>
        <span className={`${styles["logo-wave"]}`}>e</span>
      </div>
    </div>
  )
}

export default Logo
