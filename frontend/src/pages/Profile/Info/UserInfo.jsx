import styles from "./UserInfo.module.css"
import MyCalendar from "../../../components/MyCalendar/MyCalendar"
import userlevel from "../../../assets/award.png"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
// import axios from "axios"
import { AxiosGetUser } from "../../../store/user-slice"
import { AxiosGetCategory } from "../../../store/category-slice"
import axios from "axios"
import CateIcon from "../../../components/CateIcon/CateIcon"
// import CalendarInfo from "../../../components/MyCalendar/CalendarInfo"
// import NightSky from "../../../components/Canvas/NightSky/NightSky"
import DoneWorksVisualization from "./DoneWorksVisualization"
import DoneCategoriesVisualization from "./DoneCategoriesVisualization"
import BarChartDoneWorksforThisWeek from './BarChartDoneWorksforThisWeek'
import PieChartDoneWorksBeforeAim from './PiechartDoneWorksBeforeAim'
// import { Bar } from '@nivo/bar';
// import { ResponsivePie } from "@nivo/pie"
// import { core } from "@nivo/core"

function UserInfo() {
  const { categoryList } = useSelector((state) => state.category)
  const userinfo = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isInitial, setIsInitial] = useState(true)

  const id = useSelector((state) => state.user?.userData?.id)
  const [isLogin, setIsLogin] = useState(
    id ? true : false || localStorage.getItem("Access") ? true : false
  )

  useEffect(function () {
    if (localStorage.getItem("Access") && localStorage.getItem("Refresh")) {
      axios.defaults.headers.common["AccessToken"] =
        localStorage.getItem("Access")
      axios.defaults.headers.common["RefreshToken"] =
        localStorage.getItem("Refresh")
    }
  }, [])

  useEffect(
    function () {
      setIsLogin(() =>
        id
          ? true
          : false ||
            (localStorage.getItem("Access") && localStorage.getItem("Refresh"))
          ? true
          : false
      )
    },
    [id]
  )

  useEffect(
    function () {
      if (isInitial) {
        setIsInitial(() => false)
      }
      if (isLogin) {
        dispatch(AxiosGetUser())
        dispatch(AxiosGetCategory())
      }
    },
    [dispatch, isInitial, isLogin]
  )

  const [XY, setXY] = useState({ x: 0, y: 0 })
  const mouseMoveHandler = function (e) {
    setXY({ x: e.clientX + 10, y: e.clientY + 10 })
  }

  return (
    <div className={`${styles[`routercontainer1`]}`}>
      <div className={`${styles[`myinfo-box`]}`}>
        <div className={`${styles[`info-text`]}`}>
          <h2> My Profile </h2>
          <h1> {userinfo.userData.nickname} </h1>
        </div>

        <div className={`${styles[`myimg-box`]}`}>
          <img src={userlevel} alt="" className={`${styles[`my-img`]}`} />
        </div>
        <div>
          <div className={`${styles[`welcome-msg`]}`}>
            {userinfo.userData.nickname} 님, 환영합니다.
          </div>
          <div className={styles[`icon-container`]}>
            {categoryList.map((cate) => {
              return (
                <div
                  key={`cate-icon-in-profile-${cate.id}`}
                  className={styles[`hover-container`]}
                  onMouseMove={mouseMoveHandler}
                >
                  <CateIcon
                    value={cate.cateIcon}
                    className={`bg-cat-${cate.cateColor} ${styles[`iconz`]}`}
                  />
                  <div
                    className={styles[`hover-text`]}
                    style={{ position: "absolute", left: XY.x, top: XY.y }}
                  >
                    {cate.title}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className={`${styles["info-Box"]}`}>
        <div className={`${styles["my-calendar"]}`}>
          <MyCalendar />
        </div>

        <div className={`${styles["calendar-info"]}`}>
          {/* <CalendarInfo/> */}
        </div>
      </div>

      <div className={`${styles["chart-wrap"]}`}>

      <div className={`${styles["done-work"]}`}>
        <div className={`${styles["chart"]}`}>
          <h3 className={`${styles["chart-title"]}`}>업무 시간 비율</h3>
          <DoneWorksVisualization className={`${styles["chart1"]}`} />
        </div>

        <div className={`${styles["chart"]}`}>
          <h3 className={`${styles["chart-title"]}`}>완료 업무 카테고리 비율</h3>
          <DoneCategoriesVisualization className={`${styles["chart1"]}`} />
        </div>
      </div>

        <div className={`${styles["chart"]}`}>
          <h3 className={`${styles["chart-title"]}`}>주간 완료 업무</h3>
          <BarChartDoneWorksforThisWeek/>
        </div>

        <div className={`${styles["done-work"]}`}>

        <div className={`${styles["chart"]}`}>
        <h3 className={`${styles["chart-title"]}`}>주간 목표시간 달성 비율</h3>
        <PieChartDoneWorksBeforeAim selected="이번주"/>
        </div>

        <div className={`${styles["chart"]}`}>
        <h3 className={`${styles["chart-title"]}`}>월간 목표시간 달성 비율</h3>
        <PieChartDoneWorksBeforeAim selected="이번달"/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
