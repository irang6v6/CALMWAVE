import styles from "./UserInfo.module.css"
import MyCalendar from "../../../components/MyCalendar/MyCalendar"
import userlevel from "../../../assets/award.png"
import { useSelector,useDispatch } from "react-redux"
import {useEffect, useState } from "react"
// import axios from "axios"
import { AxiosGetUser } from "../../../store/user-slice"
// import CalendarInfo from "../../../components/MyCalendar/CalendarInfo"
// import NightSky from "../../../components/Canvas/NightSky/NightSky"



function UserInfo() {

  const userinfo = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isInitial, setIsInitial] = useState(true)

  // useEffect(() => {
  //   dispatch(AxiosGetUser());
  // }, [dispatch]);

  // if (!userinfo.userData) {
  //   return <div>로그인 ㄱㄱ</div>;
  // }

  useEffect(
    function () {
      if (isInitial) {
        setIsInitial(() => false)
      }
      dispatch(AxiosGetUser())
    },
    [dispatch, isInitial]
  )


  return (
    <div className={`${styles[`routercontainer1`]}`}>
      <div className={`${styles[`myinfo-box`]}`}>
        <div className={`${styles[`info-text`]}`}>
          <h3> My Profile </h3>
          <h1> {userinfo.userData.nickname} </h1>
          {/* <h1> Haneejo </h1> */}
          {/* <a href="#none" className={`${styles[`userInfoEdit`]}`}>
            회원정보 수정
          </a> */}
        </div>

        <div className={`${styles[`myimg-box`]}`}>
          <img src={userlevel} alt="" className={`${styles[`my-img`]}`}/>
        </div>

        <p className={`${styles[`welcome-msg`]}`}>{userinfo.userData.nickname}님, 환영합니다.</p>
        </div>

      <div className={`${styles["info-Box"]}`}>
        <div className={`${styles["my-calendar"]}`}>
        <MyCalendar/>
        </div>

        <div className={`${styles["calendar-info"]}`}>
        {/* <CalendarInfo/> */}
        </div>

      </div>
    </div>
  )
}

export default UserInfo
