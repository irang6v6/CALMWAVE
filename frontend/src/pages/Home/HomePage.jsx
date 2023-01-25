import styles from "./HomePage.module.css"
import React from "react"
import FirstPage from "./FirstPage"
import SecondPage from "./SecondPage"
import WorkTime from "./WorkTime"
import TodoList from "./TodoList"
import Posture from "./Posture"
import Stretching from "./Streching"
import Stress from "./Stress"
import NavBar from "../../components/NavBar/NavBar"
import Wave from "../../components/Canvas/Wave/Wave"
import { useRef, useState, useEffect } from "react" //
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"
function HomePage() {
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)
  const pageRef = useRef(null)
  /* eslint-disable */
  useEffect(
    function () {
      setCanvasHeight(window.innerHeight)
      setCanvasWidth(window.innerWidth)
    },
    [window.innerHeight, window.innerWidth]
  )
  useCustomWidthHeight(pageRef)
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
        <FirstPage />
        <SecondPage />
        <WorkTime />
        <TodoList />
        <Posture />
        <Stretching />
        <Stress />
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
