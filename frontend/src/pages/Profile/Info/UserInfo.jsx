import styles from "./UserInfo.module.css"
import MyCalendar from "../../../components/MyCalendar/MyCalendar"
import CalendarInfo from "../../../components/MyCalendar/CalendarInfo"

function UserInfo() {
  return (
    <div className={`${styles[`routercontainer1`]}`}>
      <div className={`${styles[`infoBox`]}`}>
        <h3> My Profile </h3>
        <h1> Haneejo </h1>
        <a href="#none" className={`${styles[`userInfoEdit`]}`}>
          회원정보 수정
        </a>
      </div>

      <div className={`${styles["info-Box"]}`}>
        <h3> 어쩌구 저쩌궁 </h3>
        <MyCalendar/>
        <CalendarInfo/>
      </div>
    </div>
  )
}

export default UserInfo
