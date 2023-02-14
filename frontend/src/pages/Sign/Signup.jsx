import { useEffect } from "react"
import { useRef, useState } from "react"
import {
  emailValidation,
  nicknameValidation,
  passwordValidation,
} from "../../utils/validation"
import styles from "./Signup.module.css"
/* eslint-disable */
import {
  SpinnerStir,
  SpinnerDots,
  SpinnerCircle,
} from "../../components/UI/Spinner"
import useApi from "../../hooks/http/use-api"

function Signup(props) {
  const [userNickname, setUserNickname] = useState("")
  const [useremail, setUseremail] = useState("")
  const [userpassword, setUserpassword] = useState("")
  const [userpassword2, setUserpassword2] = useState("")

  const [onNicknameTouched, setOnNicknameTouched] = useState(false)
  const [onEmailTouched, setOnEmailTouched] = useState(false)
  const [onPasswordTouched, setOnPasswordTouched] = useState(false)
  const [onPassword2Touched, setOnPassword2Touched] = useState(false)

  const [nickRef, emailRef, passwordRef, passwordRef2] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ]

  const [nickIsValid, setNickIsValid] = useState(true)
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [passwordIsValid, setPasswordIsValid] = useState(true)
  const [password2IsValid, setPassword2IsValid] = useState(true)

  // 이메일 중복 확인 관련
  const [emailDupValid, setEmailDupValid] = useState(null)
  const [emailDupBtnClasses, setEmailDupBtnClasses] = useState(
    `${styles[`email-dup-check-yet`]}`
  )
  const [emailCheckLoading, emailCheckError, AxiosEmailCheck] = useApi()

  const [nicknameClasses, setNicknameClasses] = useState(
    `${styles["form-input"]}`
  )
  const [emailClasses, setEmailClasses] = useState(`${styles["form-input"]}`)
  const [passwordClasses, setPasswordClasses] = useState(
    `${styles["form-input"]}`
  )
  const [password2Classes, setPassword2Classes] = useState(
    `${styles["form-input"]}`
  )
  const [buttonClasses, setButtonClasses] = useState(`${styles["form-button"]}`)

  const [nicknameValidMessage, setNicknameValidMessage] = useState("")
  const [nicknameValidMessageClasses, setNicknameValidMessageClasses] =
    useState(styles[`valid-message`])
  const [emailValidMessage, setEmailValidMessage] = useState("")
  const [emailValidMessageClasses, setEmailValidMessageClasses] = useState(
    styles[`valid-message`]
  )
  const [password1ValidMessage, setPassword1ValidMessage] = useState("")
  const [password1ValidMessageClasses, setPassword1ValidMessageClasses] =
    useState(styles[`valid-message`])
  const [password2ValidMessage, setPassword2ValidMessage] = useState("")
  const [password2ValidMessageClasses, setPassword2ValidMessageClasses] =
    useState(styles[`valid-message`])

  useEffect(
    function () {
      const { status: validStatus, message: validMessage } =
        nicknameValidation(userNickname)
      setNickIsValid(() => validStatus)
      if (validStatus) {
        setNicknameClasses(() => `${styles["form-input"]} ${styles["valid"]}`)
        setNicknameValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`valid`]}`
        )
      } else if (!onNicknameTouched) {
        setNicknameClasses(() => `${styles["form-input"]}`)
        setNicknameValidMessageClasses(() => `${styles[`valid-message`]}`)
      } else if (onNicknameTouched) {
        setNicknameClasses(() => `${styles["form-input"]} ${styles["invalid"]}`)
        setNicknameValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`invalid`]}`
        )
      }
      setNicknameValidMessage(() => validMessage)
    },
    [onNicknameTouched, userNickname]
  )
  useEffect(
    function () {
      const { status: validStatus, message: validMessage } =
        emailValidation(useremail)
      setEmailIsValid(() => validStatus)
      if (validStatus) {
        setEmailClasses(() => `${styles["form-input"]} ${styles["valid"]}`)
        setEmailValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`valid`]}`
        )
      } else if (!onEmailTouched) {
        setEmailClasses(() => `${styles["form-input"]}`)
        setEmailValidMessageClasses(() => `${styles[`valid-message`]}`)
      } else if (onEmailTouched) {
        setEmailClasses(() => `${styles["form-input"]} ${styles["invalid"]}`)
        setEmailValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`invalid`]}`
        )
      }
      setEmailValidMessage(() => validMessage)
    },
    [onEmailTouched, useremail]
  )
  useEffect(
    function () {
      const { status: validStatus, message: validMessage } =
        passwordValidation(userpassword)
      setPasswordIsValid(() => validStatus)
      if (validStatus) {
        setPasswordClasses(() => `${styles["form-input"]} ${styles["valid"]}`)
        setPassword1ValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`valid`]}`
        )
      } else if (!onPasswordTouched) {
        setPasswordClasses(() => `${styles["form-input"]}`)
        setPassword1ValidMessageClasses(() => `${styles[`valid-message`]}`)
      } else if (onPasswordTouched) {
        setPasswordClasses(() => `${styles["form-input"]} ${styles["invalid"]}`)
        setPassword1ValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`invalid`]}`
        )
      }
      setPassword1ValidMessage(() => validMessage)
    },
    [onPasswordTouched, userpassword]
  )
  // 2차 비번 effect
  useEffect(
    function () {
      if (userpassword2.trim().length === 0 && !onPassword2Touched) {
        setPassword2Classes(() => `${styles["form-input"]}`)
        setPassword2ValidMessageClasses(() => styles[`valid-message`])
        const validMessage = "2차 비밀번호는 필수 입력 값입니다."
        setPassword2ValidMessage(() => validMessage)
        return
      }
      if (userpassword2.trim().length === 0 && onPassword2Touched) {
        setPassword2Classes(
          () => `${styles["form-input"]} ${styles["invalid"]}`
        )
        setPassword2ValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`invalid`]}`
        )
        const validMessage = "2차 비밀번호는 필수 입력 값입니다."
        setPassword2ValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`invalid`]}`
        )
        setPassword2ValidMessage(() => validMessage)
        return
      }
      if (!passwordIsValid) {
        setPassword2Classes(
          () => `${styles["form-input"]} ${styles["invalid"]}`
        )
        setPassword2ValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`invalid`]}`
        )
        setPassword2ValidMessage(() => "1차 비밀번호가 유효하지 않습니다.")
        return
      }
      setPassword2IsValid(() => userpassword === userpassword2)
      if (password2IsValid) {
        setPassword2Classes(() => `${styles["form-input"]} ${styles["valid"]}`)
        setPassword2ValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`valid`]}`
        )
        setPassword2ValidMessage(() => "2차 비밀번호가 유효합니다.")
        return
      } else if (!onPassword2Touched) {
        setPassword2Classes(() => `${styles["form-input"]}`)
        setPassword2ValidMessageClasses(() => `${styles[`valid-message`]}`)
      } else if (onPassword2Touched) {
        setPassword2Classes(
          () => `${styles["form-input"]} ${styles["invalid"]}`
        )
        setPassword2ValidMessageClasses(
          () => `${styles[`valid-message`]} ${styles[`invalid`]}`
        )
        const validMessage = "2차 비밀번호가 일치하지 않습니다."
        setPassword2ValidMessage(() => validMessage)
      }
    },
    [
      onPassword2Touched,
      userpassword2,
      password2IsValid,
      userpassword,
      passwordIsValid,
    ]
  )
  useEffect(
    function () {
      if (
        nickIsValid &&
        emailIsValid &&
        passwordIsValid &&
        passwordRef2.current.value.trim().length !== 0 &&
        password2IsValid &&
        emailDupValid
      ) {
        setButtonClasses(() => `${styles["form-button"]}`)
      } else {
        setButtonClasses(() => `${styles["button-invalid"]}`)
      }
    },
    [
      nickIsValid,
      emailIsValid,
      passwordIsValid,
      password2IsValid,
      passwordRef2,
      emailDupValid,
    ]
  )

  const resetState = function () {
    nickRef.current.value = ""
    setUserNickname(() => nickRef.current.value)
    emailRef.current.value = ""
    setUseremail(() => emailRef.current.value)
    passwordRef.current.value = ""
    setUserpassword(() => passwordRef.current.value)
    passwordRef2.current.value = ""
    setUserpassword2(() => passwordRef2.current.value)
    setOnNicknameTouched(false)
    setOnEmailTouched(false)
    setOnPasswordTouched(false)
    setOnPassword2Touched(false)
    setNickIsValid(false)
    setEmailIsValid(false)
    setPasswordIsValid(false)
    setPassword2IsValid(false)
    setEmailDupValid(null)
    setEmailDupBtnClasses(() => `${styles[`email-dup-check-yet`]}`)
  }

  const emailCheckHandler = function () {
    AxiosEmailCheck(
      {
        method: "get",
        url: `/v1/account/checkemail/${useremail}`,
      },
      function (resData) {
        setEmailDupValid(() => true)
      }
    )
  }

  useEffect(
    function () {
      if (emailCheckError) {
        setEmailDupValid(() => false)
      } else {
        setEmailDupValid((val) => {
          if (val) {
            return val
          }
        })
      }
    },
    [emailCheckError]
  )

  useEffect(
    function () {
      if (emailDupValid === true) {
        setEmailDupBtnClasses(() => `${styles[`email-dup-check-complete`]}`)
      } else if (emailDupValid === false) {
        setEmailDupBtnClasses(() => `${styles[`email-dup-check-fail`]}`)
      }
    },
    [emailDupValid]
  )

  const onSubmitHandler = async function (event) {
    event.preventDefault()
    // 유효성에 따라 return 해줄지 적어야 함.
    if (
      nickIsValid &&
      emailIsValid &&
      emailDupValid &&
      passwordIsValid &&
      password2IsValid
    ) {
      const status = props.onSignup(
        useremail,
        userpassword,
        userNickname,
        resetState
      )
      // 성공적으로 회원가입 시
      // props.onLogin() // 로그인 창으로 넘겨주기
      // 회원가입 실패 시
    } else {
      setOnNicknameTouched(() => true)
      setOnEmailTouched(() => true)
      setOnPasswordTouched(() => true)
      setOnPassword2Touched(() => true)
      if (!emailIsValid && emailDupValid !== true) {
        setEmailDupValid(() => false)
      }
    }
  }
  const toggleToLogin = function (event) {
    event.preventDefault()
    // 유효성에 따라 return 해줄지 적어야 함.
    props.onLogin()
    resetState()
  }

  const onInputNicknameHandler = function () {
    if (nickRef.current.value.length > 8) {
      return
    }
    setUserNickname(() => nickRef.current.value)
  }
  const onInputEmailHandler = function () {
    if (emailDupValid) {
      console.log(emailDupValid, "<<")
      return
    }
    setUseremail(() => emailRef.current.value)
  }
  const onInputPasswordHandler = function () {
    if (passwordRef.current.value.length > 16) {
      return
    }
    setUserpassword(() => passwordRef.current.value)
  }
  const onInputPasssword2Handler = function () {
    if (passwordRef2.current.value.length > 16) {
      return
    }
    setUserpassword2(() => passwordRef2.current.value)
  }

  const toggleNicknameTouched = function () {
    setOnNicknameTouched((val) => true)
  }
  const toggleEmailTouched = function () {
    setOnEmailTouched((val) => true)
  }
  const togglePasswordTouched = function () {
    setOnPasswordTouched((val) => true)
  }
  const togglePassword2Touched = function () {
    setOnPassword2Touched((val) => true)
  }

  return (
    <div className={`${styles["page"]}`}>
      <form
        className={`${styles["form-container"]}`}
        onSubmit={onSubmitHandler}
      >
        <div className={`input-container`}>
          <div className={`${styles["label-container"]}`}>
            <br />
            <label htmlFor="signup-nn" className={`${styles["form-label"]}`}>
              닉네임
            </label>
            <br />
            <span
              className={`${styles["change-button"]}`}
              onClick={toggleToLogin}
            >
              로그인
            </span>
          </div>
          <input
            ref={nickRef}
            type="text"
            id="signup-nn"
            className={nicknameClasses}
            onChange={onInputNicknameHandler}
            onBlur={toggleNicknameTouched}
            maxLength="8"
            placeholder="2~8자로 적어주세요."
          />
          <br />
          <span className={nicknameValidMessageClasses}>
            {nicknameValidMessage}
          </span>
          <br />
          <div className={`${styles["label-container"]}`}>
            <br />
            <label htmlFor="signup-email" className={`${styles["form-label"]}`}>
              이메일
            </label>

            <span className={emailDupBtnClasses} onClick={emailCheckHandler}>
              {emailCheckLoading ? (
                <SpinnerDots />
              ) : emailDupValid === true ? (
                "확인 완료"
              ) : emailDupValid === false ? (
                "재확인"
              ) : (
                "중복 확인"
              )}
            </span>
          </div>
          <input
            ref={emailRef}
            type="email"
            id="signup-email"
            className={emailClasses}
            onChange={onInputEmailHandler}
            onBlur={toggleEmailTouched}
            placeholder="이메일을 입력해주세요."
            readOnly={emailDupValid}
          />
          <br />
          <span className={emailValidMessageClasses}>{emailValidMessage}</span>
          <br />
          <label htmlFor="signup-pw" className={`${styles["form-label"]}`}>
            비밀번호
          </label>
          <br />
          <input
            ref={passwordRef}
            type="password"
            id="signup-pw"
            className={passwordClasses}
            onChange={onInputPasswordHandler}
            onBlur={togglePasswordTouched}
            maxLength="16"
            placeholder="영어, 특수문자, 숫자가 반드시 포함된 8~16자야 합니다."
          />
          <br />
          <span className={password1ValidMessageClasses}>
            {password1ValidMessage}
          </span>
          <br />
          <label htmlFor="signup-pw2" className={`${styles["form-label"]}`}>
            비밀번호 확인
          </label>
          <br />
          <input
            ref={passwordRef2}
            type="password"
            id="signup-pw2"
            className={password2Classes}
            onChange={onInputPasssword2Handler}
            onBlur={togglePassword2Touched}
            maxLength="16"
            placeholder="비밀번호와 일치해야 합니다."
          />
          <br />
          <span className={password2ValidMessageClasses}>
            {password2ValidMessage}
          </span>
          <br />
          <br />
        </div>
        <div className={`${styles["button-container"]}`}>
          {props.isLoading ? (
            <SpinnerDots />
          ) : (
            <button className={buttonClasses}>회원 가입</button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Signup
