import { useEffect, useState } from "react"
import Login from "./Login"
import styles from "./SignPage.module.css"
import Signup from "./Signup"
import LoginLogo from "./LoginLogo"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function SignPage({ pageRef }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [loginOrSignup, setLoginOrSignup] = useState(true)
  const [page1Class, setPage1Class] = useState(`${styles["page1"]}`)
  const [page2Class, setPage2Class] = useState(`${styles["page2"]}`)

  useEffect(
    function () {
      if (loginOrSignup) {
        setPage1Class(`${styles["page1"]}`)
        setPage2Class(`${styles["page2"]}`)
      } else {
        setPage1Class(`${styles["page1"]} ${styles["flipped"]}`)
        setPage2Class(`${styles["page2"]} ${styles["flipped"]}`)
      }
    },
    [loginOrSignup]
  )

  const toggleLoginOrSignup = function () {
    setLoginOrSignup((val) => !val)
  }
  const googleLoginHandler = async function () {
    axios({
      method: "post",
      baseURL: "http://asdfasdfxxc",
      url: "/authorization/google",
      headers: {},
      withCredentials: true,
    })
  }
  const loginHandler = async function (email, password) {
    setIsLoading(true)
    axios({
      method: "post",
      baseURL: "https://5d2112b6-33e0-4cf7-853b-f9d783cec939.mock.pstmn.io",
      url: "/login",
      data: {
        username: email,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res)
        console.log(res.headers["AccessToken"], "액세스 토큰")
        console.log(res.headers["RefreshToken"], "리프레시 토큰")
        console.log("로그인 성공! 여기서 redux 갱신")
        setIsLoading(false)
        navigate("/")
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }
  const signupHandler = function (email, password, nickname, resetAction) {
    setIsLoading(true)
    let ret
    axios({
      method: "post",
      baseURL: "https://5d2112b6-33e0-4cf7-853b-f9d783cec939.mock.pstmn.io",
      url: "/api/v1/join",
      data: {
        username: email,
        password: password,
        nickname: nickname,
      },
    })
      .then((res) => {
        console.log(res)
        console.log("여기서 redux 갱신")
        setIsLoading(false)
        toggleLoginOrSignup()
        resetAction()
      })
      .catch((err) => {
        console.error(err)
        ret = err
        setIsLoading(false)
      })
    return ret
  }

  return (
    <div ref={pageRef} className={`${styles["sign-container"]}`}>
      <LoginLogo />
      <div className={`${styles["book"]}`}>
        <div className={page1Class}>
          <Login
            onSignup={toggleLoginOrSignup}
            onLogin={loginHandler}
            isLoading={isLoading}
            googleLogin={googleLoginHandler}
          />
        </div>
        <div className={page2Class}>
          <Signup
            onLogin={toggleLoginOrSignup}
            onSignup={signupHandler}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default SignPage
