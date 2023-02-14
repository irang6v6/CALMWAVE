import styles from "./EnterPage.module.css"
import React from "react"
// import turtleImg from "../../../assets/blueturtle.png"
import { NavLink } from "react-router-dom"
// import Logo from "../../../components/Logo/Logo"
import LogoImg from "../../../assets/logo_imgonly.png"
// import { AiFillPlayCircle, AiFillInfoCircle, AiFillEdit } from "react-icons/ai"
import { VscTriangleDown } from "react-icons/vsc"
import startbtn from "../../../assets/enter_start.png"
import mypagebtn from "../../../assets/enter_mypage.png"
import { useSelector } from "react-redux"
import { useState,useEffect } from "react"

function EnterPage(props) {
  // const dispatch = useDispatch()
  const id = useSelector((state) => state.user.userData.id)
  const [isLogin, setIsLogin] = useState(
    id ? true : false || localStorage.getItem("Access") ? true : false
  )

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



  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <div className={`${styles["left-box"]}`}>
          {/* <Logo /> */}
            <img src={LogoImg} alt="logoImg" className={`${styles["logo-img"]}`}/>
        </div>

        <div className={`${styles["right-box"]}`}>
          <div className={`${styles["text-box"]}`}>
            <span className={`${styles[`slogun-kr`]}`}>
              조금씩 더 나아질 당신을 위해
            </span>
            <span className={`${styles[`slogun-en`]}`}>
              For You who will get better little by little
            </span>
            <div className={`${styles["icon-wrap"]}`}>
              <NavLink
                to={isLogin ? '/door' : '/sign'}
                className={`${styles[`shortcut-container`]}`}
              >
                {/* <AiFillPlayCircle className={`${styles[`icons`]}`} /> */}
                <img src={startbtn} alt="룸 입장" className={`${styles[`enter-btn`]}`}/>
              </NavLink>

              <NavLink
                to={isLogin ? '/profile' : '/sign'}
                className={styles['shortcut-container']}
              >
                {/* <AiFillInfoCircle className={`${styles[`icons`]}`} /> */}
                <img src={mypagebtn} alt="마이페이지" className={`${styles[`enter-btn`]}`}/>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles["go-down"]}`} onClick={props.goNext}>
        <VscTriangleDown className={`${styles[`go-down-icon`]}`} />
      </div>
    </div>
  )
}
export default EnterPage
