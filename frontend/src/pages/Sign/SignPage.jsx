import { useEffect, useState } from "react"
import Login from "./Login"
import styles from "./SignPage.module.css"
import Signup from "./Signup"
import LoginLogo from "./LoginLogo"
import { useNavigate } from "react-router-dom"
// import axios from "axios"
import useApi from "../../hooks/http/use-api"
import { useDispatch } from "react-redux"
import { AxiosGetUser } from "../../store/user-slice"

function SignPage({ pageRef }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginLoading, loginError, loginRequest] = useApi()
  const [signupLoading, signupError, signupRequest] = useApi()
  const [loginOrSignup, setLoginOrSignup] = useState(true)
  const [page1Class, setPage1Class] = useState(`${styles["page1"]}`)
  const [page2Class, setPage2Class] = useState(`${styles["page2"]}`)

  const [toastMessage, setToastMessage] = useState("")
  const [needToast, setNeedToast] = useState(false)

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
    window.location.href = `
    https://i8a105.p.ssafy.io/api/oauth2/authorization/google`
    // 이후 AccessToken, RefreshToken, userid를 페이지에서 받아오고 작업시켜야 한다.
  }

  const loginHandler = async function (email, password) {
    loginRequest(
      {
        method: "post",
        url: "/login",
        data: {
          username: email,
          password: password,
        },
      },
      function (res) {
        if (res) {
          dispatch(AxiosGetUser())
          // localStorage.setItem("isLogin", true)
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
        url: "/v1/account/join",
        data: {
          username: email,
          password: password,
          nickname: nickname,
        },
      },
      // res로 { "result": "ok" } 가 온다
      async function (res) {
        if (res.data.result === "ok") {
          setToastMessage(() => "회원가입 완료!\n로그인 해주세요!")
          setNeedToast(() => true)
          toggleLoginOrSignup()
          resetAction()
        }
      }
    )
  }
  // 에러 핸들링
  useEffect(
    function () {
      if (loginError) {
        setToastMessage("로그인 실패!\n다시 시도해주세요!")
        setNeedToast(() => true)
      } else if (signupError) {
        setToastMessage("회원가입 실패!\n다시 시도해주세요!")
        setNeedToast(() => true)
      } else {
        setNeedToast(() => false)
      }
    },
    [loginError, signupError]
  )

  const toastOffHandler = function () {
    console.log("이거 실행 외않되 ㅠㅠ")
    setNeedToast(() => false)
  }

  useEffect(
    function () {
      console.log(needToast, "ㅎㅇ")
    },
    [needToast]
  )

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
      {needToast && (
        <div
          className={`${styles[`toast-container`]}`}
          onAnimationEnd={toastOffHandler}
        >
          <div className={styles[`toast-title`]}>알람</div>
          <div>{toastMessage}</div>
          <div className={styles[`toast-bottom`]}></div>
        </div>
      )}
    </div>
  )
}

export default SignPage
