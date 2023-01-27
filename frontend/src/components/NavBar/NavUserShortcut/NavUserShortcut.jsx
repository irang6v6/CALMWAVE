import { useSelector } from "react-redux"
import styles from "./NavUserShortcut.module.css"

function NavUserShortcut(props) {
  const userNickname = useSelector((state) => state.user.userNickname)
  const userDescription = useSelector((state) => state.user.description)

  return (
    <div
      className={`${props.className} ${styles["shortcut-container"]}`}
      onClick={props.onClick}
    >
      <div>{userNickname}</div>
      <div>{userDescription}</div>
    </div>
  )
}

export default NavUserShortcut
