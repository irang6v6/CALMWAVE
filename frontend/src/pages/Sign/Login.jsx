import { useEffect, useState, useRef } from "react"
import { emailValidation, passwordValidation } from "../../utils/validation"
import styles from "./Login.module.css"
import googleLogo from "../../assets/google_social.png"

/* eslint-disable */
import {
  SpinnerStir,
  SpinnerDots,
  SpinnerCircle,
} from "../../components/UI/Spinner"

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
  const [buttonClasses, setButtonClasses] = useState(
    `${styles["button-invalid"]}`
  )
  const [emailRef, passwordRef] = [useRef(), useRef()]

  const [emailValidMessage, setEmailValidMessage] = useState("")
  const [passwordValidMessage, setPasswordValidMessage] = useState("")
  const [loginFailedMessage, setLoginFailedMessage] = useState("")
  const [emailValidMessageClasses, setEmailValidMessageClasses] = useState(
    `${styles[`valid-message`]}`
  )
  const [passwordValidMessageClasses, setPasswordValidMessageClasses] =
    useState(styles[`valid-message`])

  useEffect(
    function () {
      const { status: validStatus, message: validMessage } =
        emailValidation(userEmail)
      setEmailIsValid(() => validStatus)
      setEmailValidMessage(() => validMessage)
      if (validStatus) {
        setEmailClasses(() => `${styles["form-input"]} ${styles["valid"]}`)
      } else if (!onEmailTouched) {
        setEmailClasses(() => `${styles["form-input"]}`)
      } else if (onEmailTouched) {
        setEmailClasses(() => `${styles["form-input"]} ${styles["invalid"]}`)
      }
    },
    [onEmailTouched, userEmail]
  )
  useEffect(
    function () {
      const { status: validStatus, message: validMessage } =
        passwordValidation(userPassword)
      setPasswordIsValid(() => validStatus)
      setPasswordValidMessage(() => validMessage)
      if (validStatus) {
        setPasswordClasses(() => `${styles["form-input"]} ${styles["valid"]}`)
      } else if (!onPasswordTouched) {
        setPasswordClasses(() => `${styles["form-input"]}`)
      } else if (onPasswordTouched) {
        setPasswordClasses(() => `${styles["form-input"]} ${styles["invalid"]}`)
      }
    },
    [onPasswordTouched, userPassword]
  )

  useEffect(
    function () {
      if (emailIsValid && passwordIsValid) {
        setButtonClasses(() => `${styles["form-button"]}`)
      } else {
        setButtonClasses(() => `${styles["button-invalid"]}`)
      }
    },
    [emailIsValid, passwordIsValid]
  )

  useEffect(
    function () {
      if (!onEmailTouched) {
        setEmailValidMessageClasses(() => styles[`valid-message`])
      } else if (emailIsValid && onEmailTouched) {
        setEmailValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`valid`]}`
        )
      } else {
        setEmailValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`invalid`]}`
        )
      }
      if (!onPasswordTouched) {
        setPasswordValidMessageClasses(() => styles[`valid-message`])
      } else if (passwordIsValid && onPasswordTouched) {
        setPasswordValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`valid`]}`
        )
      } else {
        setPasswordValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`invalid`]}`
        )
      }
    },
    [onEmailTouched, onPasswordTouched, emailIsValid, passwordIsValid]
  )

  const resetState = function () {
    emailRef.current.value = ""
    setUserEmail(() => emailRef.current.value)
    passwordRef.current.value = ""
    setUserPassword(() => passwordRef.current.value)
    setOnEmailTouched(false)
    setOnPasswordTouched(false)
    setEmailIsValid(false)
    setPasswordIsValid(false)
  }

  const onSubmitHandler = function (event) {
    event.preventDefault()
    if (emailIsValid && passwordIsValid) {
      props.onLogin(userEmail, userPassword)
    } else {
      setOnEmailTouched(() => true)
      setOnPasswordTouched(() => true)
      return
    }
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
    resetState()
  }

  const googleLogin = function () {
    props.googleLogin()
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
              <span>이메일</span>
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
          <span className={emailValidMessageClasses}>{emailValidMessage}</span>
          <br />
          <br />
          <label htmlFor="pw" className={`${styles["form-label"]}`}>
            비밀번호
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
          <span className={passwordValidMessageClasses}>
            {passwordValidMessage}
          </span>
          <br />
          <br />
        </div>
        <div className={`${styles["button-container"]}`}>
          <button className={buttonClasses}>
            {props.isLoading ? <SpinnerDots /> : "로그인"}
          </button>
        </div>
        <div className={`${styles["social-container"]}`} onClick={googleLogin}>
          <img
            alt="구글"
            src={googleLogo}
            className={`${styles["social-image"]}`}
          />
          <div className={`${styles[`social-login-txt`]}`}>구글 로그인</div>
        </div>
      </form>
    </div>
  )
}

export default Login
