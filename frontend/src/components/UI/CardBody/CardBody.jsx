import styles from "./CardBody.module.css"
import { memo } from "react"

function CardBody({ data, onClick }) {
  return (
    <div className={`${styles[`card-body-container`]}`} onClick={onClick}>
      <div>{data.description ? `세부 내용 : ${data.description}` : ""}</div>
      <div>
        목표시간 :{" "}
        {data.storyPoint ? parseInt(data?.storyPoint) / 3600 : "미지정"}
      </div>
      <div>
        목표일자 :{" "}
        {data.finishedDate ? data.finishedDate.substr(0, 10) : "미지정"}
      </div>
      <div className={`${styles[`card-body-data`]}`}>
      </div>
    </div>
  )
}

export default memo(CardBody)
