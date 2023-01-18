import Login from "./Login"
import styles from "./SignPage.module.css"

function SignPage() {
  return (
    <div className={`${styles["sign-container"]}`}>
      <Login />
    </div>
  )
}

export default SignPage
