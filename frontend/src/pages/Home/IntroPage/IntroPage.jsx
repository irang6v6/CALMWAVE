import styles from "./IntroPage.module.css"
import React from "react"
import pomodoro from "../../../assets/pomodoro.png"
import gtd from "../../../assets/GTD.png"
import timeblock from "../../../assets/timeblock.png"
import { VscTriangleDown } from "react-icons/vsc"

function IntroPage(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <div className={`${styles["work-box"]}`}>
          <h2>뽀모도로</h2>
          <img src={pomodoro} alt="pomodoro" className={`${styles["pomodoro-img"]}`}/>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.<br/>
          Eos, vero. amet consectetur adipisicing
          <br/>Lorem ipsum, dolor sit amet consectetur adipisi<br/>
          Lorem ipsum, dolor sit amet consectetur <br/>
          adipisinsectetur adipisic<br/>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>

        <div className={`${styles["work-box"]}`}>
          <h2>타임박스</h2>
          <img src={timeblock} alt="타임블럭" className={`${styles["time-box-img"]}`}/>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.<br/>
          Eos, vero. amet consectetur adipisicing
          <br/>Lorem ipsum, dolor sit amet consectetur adipisi<br/>
          Lorem ipsum, dolor sit amet consectetur <br/>
          adipisinsectetur adipisic<br/>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>

        <div className={`${styles["work-box"]}`}>
          <h2>GTD</h2>
          <img src={gtd} alt="gtd" className={`${styles["gtd-img"]}`}/>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.<br/>
          Eos, vero. amet consectetur adipisicing
          <br/>Lorem ipsum, dolor sit amet consectetur adipisi<br/>
          Lorem ipsum, dolor sit amet consectetur <br/>
          adipisinsectetur adipisic<br/>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        {/* <div className={`${styles["text-wrap"]}`}>
          <h1>업무 시간을 편하게 관리</h1>
          <p>
            업무 누적 시간을 한 눈에 확인할 수 있어요. 업무 누적 시간을 한 눈에
            확인할 수 있어요. <br />
            업무 누적 시간을 한 눈에 확인할 수 있어요. 업무 누적 시간을 한 눈에
            확인할 수 있어요. 업무 누적 시간을 한 업무 누적 시간을 한 눈에
            확인할 수 있어요{" "}
          </p>
        </div>
        <div className={`${styles["img-wrap"]}`}>
          <img src={workTime} alt="임시이미지" />
        </div> */}
      </div>
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
      <VscTriangleDown className={`${styles[`go-down-icon`]}`} />
      </div>
    </div>
  )
}
export default IntroPage
