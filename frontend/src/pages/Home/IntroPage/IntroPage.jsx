import styles from "./IntroPage.module.css"
import React from "react"
import pomodoro from "../../../assets/pomodoro.png"
import gtd from "../../../assets/GTD.png"
import timeblock from "../../../assets/timeblock.png"
import { VscTriangleDown } from "react-icons/vsc"

function IntroPage(props) {
  return (
    <div ref={props.refVal} className={`${styles["container"]}`}>
      {props.scrollTrigger ? (
        <>
          <div className={`${styles["header-text"]}`}>
            Calm Wave, 이렇게 이용해보세요
          </div>
          <div className={`${styles["inner"]}`}>
            <div className={`${styles["work-box1"]}`}>
              <div className={`${styles[`type-text`]}`}>GTD</div>
              <img src={gtd} alt="gtd" className={`${styles["gtd-img"]}`} />
              <div className={`${styles["method-description"]}`}>
                <div>
                  GTD 방식을 사용하면, 해야 할 일을 떠올리려 애쓰는
                  <br />
                  대신 실제 업무를 처리하는 데 집중할 수 있습니다.
                </div>
                <br />
                해야 할 일을 모두 작성한 뒤, 업무를 정렬하고
                <br />
                우선순위를 지정하세요.
                <br />
                예를 들어, 더 이상 할 필요가 없는 업무,
                <br />
                언젠가 해야 하지만 지금은 할 필요가 없는 업무,
                <br />
                다른 작업에 종속된 작업 등으로 분류합니다.
              </div>
            </div>

            <div className={`${styles["work-box2"]}`}>
              <div className={`${styles[`type-text`]}`}>타임박스</div>
              <img
                src={timeblock}
                alt="타임블럭"
                className={`${styles["time-box-img"]}`}
              />
              <div className={`${styles["method-description"]}`}>
                <div>
                  타임박싱은 생산성을 향상하고 미루는 습관을
                  <br />
                  줄여 주는 목표 지향적 시간 관리 전략입니다.
                </div>
                <br />
                누구나 30분이면 끝낼 수 있는 작업을 제대로 통제하지 못해 하루를
                다 보내고 나서야 끝낸 경험이 있을 것입니다. ‘타임박스’를
                만든다는 것은 일정 시간 내에 특정한 <br />
                작업을 끝내겠다는 목표를 세우는 것을 말합니다.
                <br />
                업무 스케줄을 최대한 세분화해 그 우선순위에 따라
                <br />
                업무 시간을 배분해보세요.
              </div>
            </div>

            <div className={`${styles["work-box3"]}`}>
              <div className={`${styles[`type-text`]}`}>포모도로</div>
              <img
                src={pomodoro}
                alt="pomodoro"
                className={`${styles["pomodoro-img"]}`}
              />
              <div className={`${styles["method-description"]}`}>
                <div>
                  포모도로 기법은 단기간에 업무를 수행하고 <br />
                  업무 세션 사이에 휴식을 취하는 방법입니다.
                </div>
                <br /> 포모도로 시간 관리 전략은 규칙적인 휴식을 취하는 것이
                <br />
                권장되므로 특히 본질적인 동기 부여를 이끌어 내 <br />
                두뇌에도 좋습니다. <br />
                <br />
                25분간 일하고 5분간 휴식을 취하는 과정을
                <br />
                4회 반복합니다.
                <br />
                그런 다음, 네 번째 작업 세션이 끝나면
                <br />
                20~30분 정도 긴 휴식을 취하세요.
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
        <VscTriangleDown className={`${styles[`go-down-icon`]}`} />
      </div>
    </div>
  )
}
export default IntroPage
