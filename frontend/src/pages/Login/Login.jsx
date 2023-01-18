import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Wave from "../../components/Canvas/Wave/Wave"
import { emailValidation, passwordValidation } from "../../utils/validation"
import styles from "./Login.module.css"
import LoginLogo from "./LoginLogo"

function Login() {
  const navigate = useNavigate()
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
  }

  const onInputEmailHandler = function (event) {
    setUserEmail(event.target.value)
  }
  const onInputPasswordHandler = function (event) {
    if (event.target.value.length === 17) {
      return
    }
    setUserPassword(() => event.target.value)
  }
  const onEmailBlurHandler = function () {
    setOnEmailTouched(true)
  }
  const onPasswordBlurHandler = function () {
    setOnPasswordTouched(true)
  }

  const pushSignUp = function (event) {
    event.preventDefault()
    navigate(`/signup`)
  }

  return (
    <div className={`${styles["page"]}`}>
      <Wave canvasHeight={1000} canvasWidth={1000} />
      <form
        onSubmit={onSubmitHandler}
        className={`${styles["form-container"]}`}
      >
        <LoginLogo />
        <div className={`input-container`}>
          <label htmlFor="email" className={`${styles["form-label"]}`}>
            E-mail
          </label>
          <br />
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={onInputEmailHandler}
            className={emailClasses}
            onBlur={onEmailBlurHandler}
            placeholder="이메일을 입력하세요."
          />
          <br />
          <label htmlFor="pw" className={`${styles["form-label"]}`}>
            Password
          </label>
          <br />
          <input
            type="password"
            id="pw"
            value={userPassword}
            onChange={onInputPasswordHandler}
            className={`${passwordClasses} ${styles["notvalid"]}`}
            onBlur={onPasswordBlurHandler}
            placeholder="비밀번호를 입력하세요."
          />
          <br />
        </div>
        <button className={`${styles["form-button"]}`}>로그인</button>
      </form>
      <button className={`${styles["form-button"]}`} onClick={pushSignUp}>
        회원 가입
      </button>
    </div>
  )
}

export default Login
