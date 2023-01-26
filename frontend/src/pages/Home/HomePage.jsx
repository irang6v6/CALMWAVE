import styles from "./HomePage.module.css"
import React from "react"
import FirstPage from "./FirstPage"
import SecondPage from "./SecondPage"
import WorkTime from "./WorkTime"
import TodoList from "./TodoList"
import Posture from "./Posture"
import Stretching from "./Streching"
import Stress from "./Stress"
import LastPage from "./LastPage"
import NavBar from "../../components/NavBar/NavBar"
import Wave from "../../components/Canvas/Wave/Wave"
import { useRef, useState, useEffect } from "react" //
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"
function HomePage() {
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)
  const pageRef = useRef(null)
  const secondRef = useRef(null)
  const [worktimeRef, todoRef, postureRef, stretchRef, stressRef, LastRef] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]
  /* eslint-disable */
  useEffect(
    function () {
      setCanvasHeight(window.innerHeight)
      setCanvasWidth(window.innerWidth)
    },
    [window.innerHeight, window.innerWidth]
  )
  useCustomWidthHeight(pageRef)
  const goUp = function () {
    pageRef.current.scrollIntoView({ behavior: "smooth" })
  }
  const goSecond = function () {
    secondRef.current.scrollIntoView({ behavior: "smooth" })
  }
  const goWorkTime = function () {
    worktimeRef.current.scrollIntoView({ behavior: "smooth" })
  }
  const goTodo = function () {
    todoRef.current.scrollIntoView({ behavior: "smooth" })
  }
  const goPosture = function () {
    postureRef.current.scrollIntoView({ behavior: "smooth" })
  }
  const goStreching = function () {
    stretchRef.current.scrollIntoView({ behavior: "smooth" })
  }
  const goStress = function () {
    stressRef.current.scrollIntoView({ behavior: "smooth" })
  }
  const goLast = function () {
    LastRef.current.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <>
      <NavBar />
      <div ref={pageRef} className={`${styles["container"]}`}>
        <div className={`${styles["wave-container"]}`}>
          <Wave
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            background={`rgba(255, 255, 255, 0.8)`}
            // background={`rgba(31, 31, 36)`}
          />
        </div>
        <FirstPage goNext={goSecond} />
        <SecondPage refVal={secondRef} goNext={goWorkTime} />
        <WorkTime refVal={worktimeRef} goNext={goTodo} />
        <TodoList refVal={todoRef} goNext={goPosture} />
        <Posture refVal={postureRef} goNext={goStreching} />
        <Stretching refVal={stretchRef} goNext={goStress} />
        <Stress refVal={stressRef} goNext={goLast}/>
        <LastPage refVal={LastRef}/>
        <div className={`${styles["go-up"]}`} onClick={goUp}>
          위로!
        </div>
        {/* <div className={`${styles["intro-page"]}`}>
        <div className={`${styles["left-box"]}`}>
          <img className={`${styles["logoImg"]}`} src={logoImg} alt="logoimg"></img>
          </div>
        <div className={`${styles["right-box"]}`}>
          </div>
      </div> */}
      </div>
    </>
  )
}
export default HomePage
