import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import styles from "./NavUserShortcut.module.css"

function NavUserShortcut(props) {
  const userNickname = useSelector((state) => state.user.userNickname)
  const userDescription = useSelector((state) => state.user.description)
  const [classes, setClasses] = useState("")
  useEffect(function () {
    setClasses(() => `${props.className} ${styles["shortcut-container"]}`)
  }, [])
  return (
    <div className={classes}>
      <div>{userNickname}</div>
      <div>{userDescription}</div>
    </div>
  )
}

export default NavUserShortcut
