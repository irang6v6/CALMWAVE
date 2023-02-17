import styles from "./HomePage.module.css"
import React, { useCallback } from "react"
import EnterPage from "./EnterPage/EnterPage"
import InfoPage from "./InfoPage/InfoPage"
import IntroPage from "./IntroPage/IntroPage"
import AlarmPage from "./AlarmPage/AlarmPage"
import ResultPage from "./ResultPage/ResultPage"
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
  const [alarmScroll, setAlarmScroll] = useState(
    window.scrollY >= canvasHeight * 2.4
  )
  const [resultScroll, setResultScroll] = useState(
    window.scrollY >= canvasHeight * 2.4
  )
  const scrollInfoManageHandler = useCallback(
    function () {
      if (window.scrollY >= canvasHeight * 0.4) {
        setInfoScroll(() => true)
      } else if (window.scrollY <= canvasHeight * 0.1) {
        setInfoScroll(() => false)
      }
    },
    [scrollY]
  )
  const scrollIntroHandler = useCallback(
    function () {
      if (window.scrollY >= window.innerHeight * 1.4) {
        setIntroScroll(() => true)
      } else if (window.scrollY <= window.innerHeight * 1.1) {
        setIntroScroll(() => false)
      }
    },
    [scrollY]
  )
  const scrollAlarmHandler = useCallback(
    function () {
      if (window.scrollY >= window.innerHeight * 2.4) {
        setAlarmScroll(() => true)
      } else if (window.scrollY <= window.innerHeight * 2.1) {
        setAlarmScroll(() => false)
      }
    },
    [scrollY]
  )
  const scrollResultHandler = useCallback(
    function () {
      if (window.scrollY >= window.innerHeight * 3.4) {
        setResultScroll(() => true)
      } else if (window.scrollY <= window.innerHeight * 3.1) {
        setResultScroll(() => false)
      }
    },
    [scrollY]
  )
  useEffect(
    function () {
      window.addEventListener("scroll", scrollIntroHandler)
      return function () {
        window.removeEventListener("scroll", scrollIntroHandler)
      }
    },
    [scrollIntroHandler]
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
  useEffect(
    function () {
      window.addEventListener("scroll", scrollAlarmHandler)
      return function () {
        window.removeEventListener("scroll", scrollAlarmHandler)
      }
    },
    [scrollAlarmHandler]
  )
  useEffect(
    function () {
      window.addEventListener("scroll", scrollResultHandler)
      return function () {
        window.removeEventListener("scroll", scrollResultHandler)
      }
    },
    [scrollResultHandler]
  )

  const pageRef = useRef(null)
  const secondRef = useRef(null)
  const [worktimeRef, todoRef, stretchRef] = [
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
  const goStreching = function () {
    stretchRef.current.scrollIntoView({ behavior: "smooth" })
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
        <EnterPage goNext={goSecond} />
        <InfoPage
          refVal={secondRef}
          goNext={goWorkTime}
          scrollTrigger={infoScroll}
        />
        <IntroPage
          refVal={worktimeRef}
          goNext={goTodo}
          scrollTrigger={introScroll}
        />
        <AlarmPage
          refVal={todoRef}
          goNext={goStreching}
          scrollTrigger={alarmScroll}
        />
        <ResultPage refVal={stretchRef} scrollTrigger={resultScroll} />
        <div className={`${styles["go-up"]}`} onClick={goUp}>
          TOP
        </div>
      </div>
    </>
  )
}
export default HomePage
