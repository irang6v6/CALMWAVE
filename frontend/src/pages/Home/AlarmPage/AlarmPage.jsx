import styles from "./AlarmPage.module.css"
import React from "react"
import bellImg from "../../../assets/bell.png"
import cuteturtle from "../../../assets/cuteturtle.png"
import stretching from "../../../assets/stretching.png"
import angryface from "../../../assets/angryface.png"
import { VscTriangleDown } from "react-icons/vsc"
import Wave from "../../../components/Canvas/Wave/Wave"
import { useCustomWidthHeight } from "../../../hooks/custom/useCustomWidthHeight"
/* eslint-disable */
// scrollTrigger, refVal, goNext
function AlarmPage(props) {
  const { width, height } = useCustomWidthHeight(props.refVal)
  return (
    <>
      <div className={`${styles[`canvas-container`]}`}>
        <Wave
          canvasHeight={height}
          canvasWidth={width}
          background={`#001930`}
        />
      </div>
      <div ref={props.refVal} className={`${styles["container"]}`}>
        {props.scrollTrigger ? (
          <div className={`${styles["inner"]}`}>
            <div className={`${styles["left-box"]}`}>
              <img
                src={bellImg}
                alt="알림 이미지"
                className={`${styles["alert-img"]}`}
              />
              <p className={`${styles["alert-text"]}`}>
                당신의 일상에 CALM하게 스며들어
                <br />
                건강까지 챙겨주는 알림 서비스
              </p>
            </div>

            <div className={`${styles["right-box"]}`}>
              <div className={`${styles["icon-wrap"]}`}>
                <img
                  src={cuteturtle}
                  alt="거북이 아이콘"
                  className={`${styles["turtle-img"]}`}
                />
                <img
                  src={stretching}
                  alt="스트레칭 아이콘"
                  className={`${styles["stretcing-img"]}`}
                />
                <img
                  src={angryface}
                  alt="화난얼굴 아이콘"
                  className={`${styles["angry-img"]}`}
                />
              </div>

              <div className={`${styles["alert-wrap"]}`}>
                <div className={`${styles["alert-box"]}`}>
                  그러다 거북이가 친구하자 하겠어요
                </div>
                <div className={`${styles["alert-box"]}`}>
                  허리피자! 허리 수술 6,000만원
                </div>
                <div className={`${styles["alert-box"]}`}>
                  띵동! 스트레칭 할 시간이예요 ~
                </div>
                <div className={`${styles["alert-box"]}`}>
                  표정이 안 좋아요! 잠시 쉬어가요
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className={`${styles["go-down"]}`} onClick={props.goNext}>
          <VscTriangleDown className={`${styles[`go-down-icon`]}`} />
        </div>
      </div>
    </>
  )
}
export default AlarmPage
