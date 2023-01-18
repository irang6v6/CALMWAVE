import React from "react"
import styles from "./Spinner.module.css"

/**
 * 두개의 원이 반복되는 스피너
 * @returns {JSX.element}
 */
const SpinnerCircle = function () {
  return (
    <div className={`${styles["circle-spinner-container"]}`}>
      <div className={`${styles["circle-spinner"]}`}>
        <div className={`${styles["circle-double-bounce1"]}`}></div>
        <div className={`${styles["circle-double-bounce2"]}`}></div>
      </div>
    </div>
  )
}

/**
 * 파문형 스피너
 * @returns {JSX.element}
 */
const SpinnerStir = function () {
  return <div className={`${styles["stir-spinner"]}`}></div>
}

/**
 * 점 3개 스피너
 * @returns {JSX.element}
 */
const SpinnerDots = function () {
  return (
    <div className={`${styles["dot-spinner-container"]}`}>
      <div className={`${styles["bounces"]} ${styles["dot-bounce1"]}`}></div>
      <div className={`${styles["bounces"]} ${styles["dot-bounce2"]}`}></div>
      <div className={`${styles["bounces"]} ${styles["dot-bounce3"]}`}></div>
    </div>
  )
}

export { SpinnerStir, SpinnerDots, SpinnerCircle }
