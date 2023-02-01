import { useEffect } from "react"
import { useState } from "react"
import ReactDOM from "react-dom"
import styles from "./Modal.module.css"
import { AiOutlineClose } from "react-icons/ai"

/**
 *
 * @isOpen `닫힘 열림`
 * @toggleIsOpen `isOpen 토글 핸들러.`
 * @children 무난한 자식들
 * @returns
 */
function Modal({ toggleIsOpen, children, isOpen }) {
  const [classes, setClasses] = useState(
    `${styles[`modal-container`]} ${styles[`close`]}`
  )

  useEffect(
    function () {
      if (isOpen) {
        setClasses(() => `${styles[`modal-container`]} ${styles[`open`]}`)
      } else {
        setClasses(() => `${styles[`modal-container`]} ${styles[`close`]}`)
      }
    },
    [isOpen]
  )

  return (
    <div>
      {ReactDOM.createPortal(
        <div
          // onClick={onConfirm}
          // onClick={toggleIsOpen}
          className={classes}
        >
          <AiOutlineClose
            className={`${styles[`modal-close-button`]}`}
            onClick={toggleIsOpen}
          />
          {children}
        </div>,
        document.getElementById("overlay-root")
      )}
    </div>
  )
}

export default Modal
