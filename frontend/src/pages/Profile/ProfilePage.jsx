import React from "react"
import "./ProfilePage.css"
import { useParams } from "react-router-dom"
import SideNav from "./SideNav/SideNav"
import UserInfo from "./Info/UserInfo"
import GraphInfo from "./GraphInfo/GraphInfo"
import Router3 from "./Router3/Router3"
import Router4 from "./Router4/Router4"

function ProfilePage() {
  const { infoType } = useParams()

  return (
    // <BrowserRouter>
    <div className="App">
      <div className="container">
        <div className="inner">
          <SideNav />
          <div className="right-box">
            {infoType === "userinfo" && <UserInfo />}
            {infoType === "graph" && <GraphInfo />}
            {infoType === "router3" && <Router3 />}
            {infoType === "router4" && <Router4 />}
          </div>
        </div>
      </div>
    </div>
    // </BrowserRouter>
  )
}

export default ProfilePage
