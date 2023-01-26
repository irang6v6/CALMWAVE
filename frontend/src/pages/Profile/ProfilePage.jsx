import React from "react"
import styles from "./ProfilePage.module.css"
import { useParams } from "react-router-dom"
// import SideNav from "./SideNav/SideNav"
import UserInfo from "./Info/UserInfo"
import GraphInfo from "./GraphInfo/GraphInfo"
import Router3 from "./Router3/Router3"
import Router4 from "./Router4/Router4"
import NavBar from "../../components/NavBar/NavBar"

function ProfilePage() {
  const { infoType } = useParams()

  return (
    <div className={`${styles["container"]}`}>
      <NavBar/>
      <div className={`${styles["inner"]}`}>
        {/* <SideNav infoType={infoType} /> */}
        <div className={`${styles["right-box"]}`}>
          {(infoType === "userinfo" || infoType === undefined) && <UserInfo />}
          {infoType === "graph" && <GraphInfo />}
          {infoType === "router3" && <Router3 />}
          {infoType === "router4" && <Router4 />}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
