import styles from "./LoginLogo.module.css"
import LogoImg from "../../assets/gologo.png"
import textlogo from "../../assets/textlogo.png"

function LoginLogo() {
  return (
    <div className={`${styles["logo-container"]}`}>
      <img alt="LoginLogo" src={LogoImg} className={`${styles["logo-img"]}`} />
      {/* <div > */}
        {/* <span className={`${styles["logo-calm"]}`}>C</span>
        <span className={`${styles["logo-calm"]}`}>a</span>
        <span className={`${styles["logo-calm"]}`}>l</span>
        <span className={`${styles["logo-calm"]}`}>m </span>
        <span className={`${styles["logo-wave"]}`}>W</span>
        <span className={`${styles["logo-wave"]}`}>a</span>
        <span className={`${styles["logo-wave"]}`}>v</span>
        <span className={`${styles["logo-wave"]}`}>e</span> */}
        <img src={textlogo} alt="캄웨이브 로고" className={`${styles["logo-wave"]}`}/>
      {/* </div> */}
    </div>
  )
}

export default LoginLogo
