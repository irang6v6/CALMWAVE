import styles from "./FirstPage.module.css"
import React from "react"
import turtleImg from "../../assets/blueturtle.png"

function FirstPage() {
  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["inner"]}`}>
        <div className={`${styles["left-box"]}`}>
          <img
            src={turtleImg}
            className={`${styles["turtle-img"]}`}
            alt="임시이미지"
          />
        </div>

        <div className={`${styles["right-box"]}`}>
          <div className={`${styles["text-box"]}`}>
            <h1>
              Lorem ipsum dolor sit. <br />
              Lorem ipsum dolor sit amet consectetur.
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
              voluptatem dolorum, magni ipsa ducimus totam{" "}
            </p>
            <div className={`${styles["btn-wrap"]}`}>
              <div className={`${styles["start-btn"]}`}>START</div>
              <div className={`${styles["mypage-btn"]}`}>MYPAGE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FirstPage
