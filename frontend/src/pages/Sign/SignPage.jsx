import { useEffect, useState } from "react"
import Login from "./Login"
import styles from "./SignPage.module.css"
import Signup from "./Signup"
import LoginLogo from "./LoginLogo"

function SignPage({ pageRef }) {
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
  const loginHandler = function () {
    console.log("로그인!")
  }
  const signupHandler = function () {
    console.log("회원가입!")
  }

  return (
    <div ref={pageRef} className={`${styles["sign-container"]}`}>
      <LoginLogo />
      <div className={`${styles["book"]}`}>
        <div className={page1Class}>
          <Login onSignup={toggleLoginOrSignup} onLogin={loginHandler} />
        </div>
        <div className={page2Class}>
          <Signup onLogin={toggleLoginOrSignup} onSignup={signupHandler} />
        </div>
      </div>
    </div>
  )
}

export default SignPage
