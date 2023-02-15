import styles from "./HomePage.module.css"
import React, { useCallback } from "react"
import EnterPage from "./EnterPage/EnterPage"
import InfoPage from "./InfoPage/InfoPage"
import IntroPage from "./IntroPage/IntroPage"
import TaskManagePage from "./TaskManagePage/TaskManagePage"
import Posture from "./Posture"
import ResultPage from "./ResultPage"
// import Stress from "./Stress"
// import LastPage from "./LastPage"
// import Wave from "../../components/Canvas/Wave/Wave"
import { useRef, useState, useEffect } from "react" //
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"
// import DiagonalWave from "../../components/Canvas/DiagonalWave/DiagonalWave"
import NightSky from "../../components/Canvas/NightSky/NightSky"
import { useDispatch } from "react-redux"
import { AxiosGetCategory } from "../../store/category-slice"
import NavIcon from "../../components/NavIcon/NavIcon"
import { AxiosGetTodos } from "../../store/task-slice"
import { AxiosGetUser } from "../../store/user-slice"
import axios from "axios"
// import { VscArrowUp } from "react-icons/vsc"

/* eslint-disable */
function HomePage() {
  const dispatch = useDispatch()
  const [isInitial, setIsInitial] = useState(true)

  const [canvasWidth, setCanvasWidth] = useState(
    document.documentElement.clientWidth
  )
  const [canvasHeight, setCanvasHeight] = useState(
    document.documentElement.clientHeight
  )
  const [infoScroll, setInfoScroll] = useState(
    window.scrollY >= canvasHeight * 0.5
  )
  const [introScroll, setIntroScroll] = useState(
    window.scrollY >= canvasHeight * 1.4
  )
  const scrollInfoManageHandler = useCallback(
    function () {
      if (window.scrollY >= canvasHeight * 0.4) {
        setInfoScroll(() => true)
      } else if (window.scrollY <= canvasHeight * 0.1) {
        setInfoScroll(() => false)
      }
    },
    [canvasHeight]
  )
  const scrollTaskManageHandler = useCallback(
    function () {
      if (window.scrollY >= window.innerHeight * 1.4) {
        setIntroScroll(() => true)
      } else if (window.scrollY <= window.innerHeight * 1.1) {
        setIntroScroll(() => false)
      }
    },
    [canvasHeight]
  )
  useEffect(
    function () {
      window.addEventListener("scroll", scrollTaskManageHandler)
      return function () {
        window.removeEventListener("scroll", scrollTaskManageHandler)
      }
    },
    [scrollTaskManageHandler]
  )
  useEffect(
    function () {
      window.addEventListener("scroll", scrollInfoManageHandler)
      return function () {
        window.removeEventListener("scroll", scrollInfoManageHandler)
      }
    },
    [scrollInfoManageHandler]
  )

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
      if (!axios.defaults.headers.common["AccessToken"]) {
        return
      }
      if (isInitial) {
        setIsInitial(() => false)
      }
      dispatch(AxiosGetCategory())
      dispatch(AxiosGetTodos())
      dispatch(AxiosGetUser())
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

  useEffect(function () {
    Notification.requestPermission()
  }, [])

  return (
    <>
      <NavIcon />
      <div ref={pageRef} className={`${styles["container"]}`}>
        <div className={`${styles["wave-container"]}`}>
          <NightSky
            canvasWidth={canvasWidth}
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
        <InfoPage
          refVal={secondRef}
          goNext={goWorkTime}
          scrollTrigger={infoScroll}
        />
        {/* <div className={`${styles["wave-container"]}`}>
          <NightSky
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            background={`rgba(32, 38, 38, 1) `}
          />
        </div> */}
        <IntroPage
          refVal={worktimeRef}
          goNext={goTodo}
          scrollTrigger={introScroll}
        />
        <TaskManagePage refVal={todoRef} goNext={goPosture} />
        <Posture refVal={postureRef} goNext={goStreching} />
        <ResultPage refVal={stretchRef} />

        <div className={`${styles["go-up"]}`} onClick={goUp}>
          TOP
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
