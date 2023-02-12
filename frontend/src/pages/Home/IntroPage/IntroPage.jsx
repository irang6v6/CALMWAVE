import styles from "./IntroPage.module.css"
import React from "react"
import pomodoro from "../../../assets/pomodoro.png"
import gtd from "../../../assets/GTD.png"
import timeblock from "../../../assets/timeblock.png"
import { VscTriangleDown } from "react-icons/vsc"

function IntroPage(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      <p className={`${styles["header-text"]}`}>
        Calm Wave, 이렇게 이용해보세요
      </p>
      <div className={`${styles["inner"]}`}>
        <div className={`${styles["work-box"]}`}>
          <h2>포모도로</h2>
          <img
            src={pomodoro}
            alt="pomodoro"
            className={`${styles["pomodoro-img"]}`}
          />
          <p>
            {" "}
            포모도로 기법은 단기간에 업무를 수행하고 <br />
            업무 세션 사이에 휴식을 취하는 방법입니다.
            <br />
            {/* <br /> 포모도로 시간 관리 전략은 규칙적인 휴식을 취하는 것이
            <br />
            권장되므로 특히 본질적인 동기 부여를 이끌어 내 <br />
            두뇌에도 좋습니다. <br /> */}
            <br />
            25분간 일하고 5분간 휴식을 취하는 과정을 4회 반복합니다.
            <br />
            그런 다음, 네 번째 작업 세션이 끝나면
            <br />
            20~30분 정도 긴 휴식을 취하세요.
          </p>
        </div>

        <div className={`${styles["work-box"]}`}>
          <h2>타임박스</h2>
          <img
            src={timeblock}
            alt="타임블럭"
            className={`${styles["time-box-img"]}`}
          />
          <p>
            타임박싱은 "타임박스(Timebox)" 내에서 업무를 완료하는
            <br />
            목표 지향적 시간 관리 전략입니다.
            <br />
            <br />이 전략은 각 작업에 얼마나 많은 시간을 할애하고 있는지 모르고
            할 일 목록을 더 신중히 작성하려는 경우에 특히 유용합니다.
            <br />
            <br />
            타임박싱을 사용하면 큰 작업을 더 작은 작업으로 나누어서 합리적인
            시간 안에 각 작업을 완료할 수 있습니다.{" "}
          </p>
        </div>

        <div className={`${styles["work-box"]}`}>
          <h2>GTD</h2>
          <img src={gtd} alt="gtd" className={`${styles["gtd-img"]}`} />
          <p>
            GTD 방식을 사용하려면 예정된 모든 업무를 한 곳에 <br />
            모으세요. 해야 할 일을 모두 작성한 뒤, 업무를 정렬하고
            <br />
            우선순위를 지정하세요.
            <br />
            <br />
            예를 들어, 더 이상 할 필요가 없는 업무,
            <br />
            언젠가 해야 하지만 지금은 할 필요가 없는 업무,
            <br />
            다른 작업에 종속된 작업 등으로 분류합니다.
            <br />
            <br />
            이 방법을 사용한다면, 해야 할 일을 떠올리려 애쓰는 대신
            <br />
            실제 업무를 처리하는 데 집중할 수 있습니다.
          </p>
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
