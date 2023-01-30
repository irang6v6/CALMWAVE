import { useEffect, useState } from "react"
import Login from "./Login"
import styles from "./SignPage.module.css"
import Signup from "./Signup"
import LoginLogo from "./LoginLogo"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import useApi from "../../hooks/http/use-api"

function SignPage({ pageRef }) {
  const navigate = useNavigate()
  const {
    isLoading: loginLoading,
    error: loginError,
    axiosRequest: loginRequest,
  } = useApi()
  const {
    isLoading: signupLoading,
    error: signupError,
    axiosRequest: signupRequest,
  } = useApi()
  // const [isLoading, setIsLoading] = useState(false)
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
    loginRequest(
      {
        method: "post",
        baseURL: "https://5d2112b6-33e0-4cf7-853b-f9d783cec939.mock.pstmn.io",
        url: "/login",
        data: {
          username: email,
          password: password,
        },
      },
      function (res) {
        if (res?.data?.response?.AccessToken) {
          localStorage.setItem(
            "Access",
            res.data.response.AccessToken.substr(7)
          )
          localStorage.setItem(
            "Refresh",
            res.data.response.RefreshToken.substr(7)
          )
          navigate("/")
        } else {
          console.log("ㅎㅇ")
        }
      }
    )
  }
  const signupHandler = async function (
    email,
    password,
    nickname,
    resetAction
  ) {
    signupRequest(
      {
        method: "post",
        baseURL: "https://5d2112b6-33e0-4cf7-853b-f9d783cec939.mock.pstmn.io",
        url: "/api/v1/join",
        data: {
          username: email,
          password: password,
          nickname: nickname,
        },
      },
      async function (res) {
        if (res?.data?.result) {
          toggleLoginOrSignup()
          resetAction()
        }
      }
    )
  }
  console.log(loginError, signupError)

  return (
    <div ref={pageRef} className={`${styles["sign-container"]}`}>
      <LoginLogo />
      <div className={`${styles["book"]}`}>
        <div className={page1Class}>
          <Login
            onSignup={toggleLoginOrSignup}
            onLogin={loginHandler}
            isLoading={loginLoading}
            googleLogin={googleLoginHandler}
          />
        </div>
        <div className={page2Class}>
          <Signup
            onLogin={toggleLoginOrSignup}
            onSignup={signupHandler}
            isLoading={signupLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default SignPage
