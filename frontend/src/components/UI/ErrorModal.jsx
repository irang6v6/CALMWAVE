import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import styles from "./ErrorModal.module.css"

/**
 * 백드롭 뒤의 검은 색 화면
 * @param {function} onConfirm props 내부에 onConfirm으로 화면의 변수를 통제하여 모달창 ON / OFF
 * @returns JSX.element
 */
const Backdrop = function ({ onConfirm }) {
  return <div className={styles.backdrop} onClick={onConfirm}></div>
}

/**
 * 백드롭 내 모달 창
 * @param {{function, string, string}} props객체 내부에 함수, str, str 순서
 * @returns JSX.element
 */
const ModalOverlay = function ({ onConfirm, title, message }) {
  return (
    <Fragment>
      <div className={`${styles.modal} ${styles.card}`}>
        <header className={styles.header}>
          <h2>{title}</h2>
        </header>
        <div className={styles.content}>
          <p>{message}</p>
        </div>
        <footer className={styles.actions}>
          <button onClick={onConfirm} className={`${styles.button}`}>
            ㅇㅋ
          </button>
        </footer>
      </div>
    </Fragment>
  )
}

/**
 * 최종 모달 창
 * @param {{function, string, string}} props객체 내부에 함수, str, str 순서
 * @returns JSX.element
 */
const ErrorModal = ({ onConfirm, title, message }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay title={title} message={message} onConfirm={onConfirm} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  )
}

export default ErrorModal
