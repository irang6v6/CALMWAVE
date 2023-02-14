import styles from "./InfoPage.module.css"
import doorImg from "../../../assets/doordoor.png"
import { VscTriangleDown } from "react-icons/vsc"

// scrollTrigger, goNext, refVal
function InfoPage(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      {props.scrollTrigger ? (
        <div className={`${styles["inner"]}`}>
          <div className={`${styles[`img-container`]}`}>
            <img
              src={doorImg}
              alt="룸페이지 이미지"
              className={`${styles["door-img"]} ${styles[`info-img`]}`}
            />
          </div>
          <div className={`${styles[`dsc-container`]}`}>
            최고의 성과를 달성하기 위한 나만의 업무 공간.
            <br />
            이제껏 경험 못했던 체계적이고 편리한 업무 관리 서비스
          </div>
        </div>
      ) : null}
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
        <VscTriangleDown className={`${styles[`go-down-icon`]}`} />
      </div>
    </div>
  )
}
export default InfoPage
