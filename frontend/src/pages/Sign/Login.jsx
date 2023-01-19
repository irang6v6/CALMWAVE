import { useEffect, useState, useRef } from "react"
import { emailValidation, passwordValidation } from "../../utils/validation"
import styles from "./Login.module.css"
import googleLogo from "../../assets/google_social.png"
import kakaoLogo from "../../assets/kakao_social.png"
import naverLogo from "../../assets/naver_social.png"

function Login(props) {
  const [userEmail, setUserEmail] = useState("") // 입력 받는 이메일
  const [userPassword, setUserPassword] = useState("") // 입력 받는 패스워드
  const [onEmailTouched, setOnEmailTouched] = useState(false) // email 처음에 건드렸는지?
  const [onPasswordTouched, setOnPasswordTouched] = useState(false) // pw 처음에 건드렸는지?
  const [emailIsValid, setEmailIsValid] = useState(false) // email 유효성
  const [passwordIsValid, setPasswordIsValid] = useState(false) // pw 유효성

  const [emailClasses, setEmailClasses] = useState(`${styles["form-input"]}`)
  const [passwordClasses, setPasswordClasses] = useState(
    `${styles["form-input"]}`
  )
  const [emailRef, passwordRef] = [useRef(), useRef()]

  useEffect(
    function () {
      setEmailIsValid(() => emailValidation(userEmail).status)
      if (emailIsValid) {
        setEmailClasses(() => `${styles["form-input"]} ${styles["valid"]}`)
      } else if (!onEmailTouched) {
        setEmailClasses(() => `${styles["form-input"]}`)
      } else if (onEmailTouched) {
        setEmailClasses(() => `${styles["form-input"]} ${styles["invalid"]}`)
      }
    },
    [onEmailTouched, userEmail, emailIsValid]
  )
  useEffect(
    function () {
      setPasswordIsValid(() => passwordValidation(userPassword).status)
    },
    [userPassword]
  )
  useEffect(
    function () {
      if (passwordIsValid) {
        setPasswordClasses(() => `${styles["form-input"]} ${styles["valid"]}`)
      } else if (!onPasswordTouched) {
        setPasswordClasses(() => `${styles["form-input"]}`)
      } else if (onPasswordTouched) {
        setPasswordClasses(() => `${styles["form-input"]} ${styles["invalid"]}`)
      }
    },
    [onPasswordTouched, passwordIsValid]
  )

  const onSubmitHandler = function (event) {
    event.preventDefault()
    props.onLogin()
  }

  const onInputEmailHandler = function () {
    setUserEmail(emailRef.current.value)
  }
  const onInputPasswordHandler = function (event) {
    const pw = passwordRef.current.value
    if (pw.length > 16) {
      return
    }
    setUserPassword(() => pw)
  }
  const onEmailBlurHandler = function () {
    setOnEmailTouched(true)
  }
  const onPasswordBlurHandler = function () {
    setOnPasswordTouched(true)
  }

  const toggleToSignup = function (event) {
    event.preventDefault()
    props.onSignup()
  }

  return (
    <div className={`${styles["page"]}`}>
      <form
        onSubmit={onSubmitHandler}
        className={`${styles["form-container"]}`}
      >
        <div className={`input-container`}>
          <br />
          <div className={`${styles["label-container"]}`}>
            <label htmlFor="email" className={`${styles["form-label"]}`}>
              <span>Email</span>
            </label>
            <span
              className={`${styles["change-button"]}`}
              onClick={toggleToSignup}
            >
              회원가입
            </span>
          </div>
          <input
            ref={emailRef}
            type="email"
            id="email"
            onChange={onInputEmailHandler}
            className={emailClasses}
            onBlur={onEmailBlurHandler}
            placeholder="이메일을 입력하세요."
            maxLength="255"
          />
          <br />
          <label htmlFor="pw" className={`${styles["form-label"]}`}>
            Password
          </label>
          <br />
          <input
            ref={passwordRef}
            type="password"
            id="pw"
            onChange={onInputPasswordHandler}
            className={`${passwordClasses} ${styles["notvalid"]}`}
            onBlur={onPasswordBlurHandler}
            placeholder="비밀번호를 입력하세요."
            maxLength="16"
          />
          <br />
        </div>
        <button className={`${styles["form-button"]}`}>로그인</button>
        <div className={`${styles["social-container"]}`}>
          <img
            alt="구글"
            src={googleLogo}
            className={`${styles["social-image"]}`}
          />
          <img
            alt="카카오"
            src={kakaoLogo}
            className={`${styles["social-image"]}`}
          />
          <img
            alt="네이버"
            src={naverLogo}
            className={`${styles["social-image"]}`}
          />
        </div>
      </form>
    </div>
  )
}

export default Login
