import styles from "./HomePage.module.css"
import React from "react"
import NavBar from "./NavBar"
import FirstPage from "./FirstPage"
import SecondPage from "./SecondPage"
import WorkTime from "./WorkTime"
import TodoList from "./TodoList"
import Posture from "./Posture"
import Stretching from "./Streching"
import Stress from "./Stress"

function HomePage() { 
  return (
    <div className={`${styles["container"]}`}>
      <NavBar/>
      <FirstPage/>
      <SecondPage/>
      <WorkTime/>
      <TodoList/>
      <Posture/>
      <Stretching/>
      <Stress/>
      {/* <div className={`${styles["intro-page"]}`}>
        <div className={`${styles["left-box"]}`}>
          <img className={`${styles["logoImg"]}`} src={logoImg} alt="logoimg"></img>
          </div>
        <div className={`${styles["right-box"]}`}>
          </div>
      </div> */}
    </div>
  )
}
export default HomePage
 