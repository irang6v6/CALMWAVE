import styles from "./HomePage.module.css"
import React from "react"
import EnterPage from "./EnterPage/EnterPage"
import InfoPage from "./InfoPage/InfoPage"
import IntroPage from "./IntroPage/IntroPage"
import TaskManagePage from "./TaskManagePage/TaskManagePage"
import Posture from "./Posture"
import Stretching from "./Streching"
import Stress from "./Stress"
import LastPage from "./LastPage"
import Wave from "../../components/Canvas/Wave/Wave"
import { useRef, useState, useEffect } from "react" //
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"
import DiagonalWave from "../../components/Canvas/DiagonalWave/DiagonalWave"
import NightSky from "../../components/Canvas/NightSky/NightSky"
import { useDispatch } from "react-redux"
import { AxiosGetCategory } from "../../store/category-slice"
import NavIcon from "../../components/NavIcon/NavIcon"

function HomePage() {
  const dispatch = useDispatch()
  const [isInitial, setIsInitial] = useState(true)

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

  // 첫 진입 시 카테고리 가져오기
  useEffect(
    function () {
      if (isInitial) {
        setIsInitial(() => false)
      }
      dispatch(
        AxiosGetCategory({
          method: "get",
          // baseURL: "http://localhost:8080",
          baseURL: "https://5d2112b6-33e0-4cf7-853b-f9d783cec939.mock.pstmn.io",
          url: "api/v1/category/list", // 주소 요청해서 보내면 가져옴.
        })
      )
    },
    [dispatch, isInitial]
  )

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
      <NavIcon />
      <div ref={pageRef} className={`${styles["container"]}`}>
        <div className={`${styles["wave-container"]}`}>
          
        <NightSky canvasWidth={canvasWidth}
            canvasHeight={canvasHeight} 
            background={`rgb(31, 31, 34)`}
            />
      </div>

          {/* <Wave
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            background={`rgb(31, 31, 34)`}
            // background={`rgba(31, 31, 36)`}
          /> */}
        {/* </div> */}
        <EnterPage goNext={goSecond} />
        {/* <div className={`${styles["wave-container"]}`}>
          <DiagonalWave
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            leftColor={`rgba(255, 255, 255, 0)`}
            rightColor={`rgba(29, 88, 164, 0.66)`}
            // background={`rgba(31, 31, 36)`}
          />
        </div> */}
        <InfoPage refVal={secondRef} goNext={goWorkTime} />
        {/* <div className={`${styles["wave-container"]}`}>
          <NightSky
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            background={`rgba(32, 38, 38, 1) `}
          />
        </div> */}
        <IntroPage refVal={worktimeRef} goNext={goTodo} />
        <TaskManagePage refVal={todoRef} goNext={goPosture} />
        <Posture refVal={postureRef} goNext={goStreching} />
        <Stretching refVal={stretchRef} goNext={goStress} />
        <Stress refVal={stressRef} goNext={goLast} />
        {/* <LastPage refVal={LastRef} /> */}
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
