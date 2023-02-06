import styles from "./CardBody.module.css"
import { memo } from "react"

function CardBody(data) {
  return (
    <div className={`${styles[`card-body-container`]}`}>
      <div className={`${styles[`card-body-data`]}`}>
        {data?.description || "빈 설명입니다~~"}
      </div>
      <div className={`${styles[`card-body-data`]}`}>
        {data?.maxPoint || 12}
      </div>
      <div className={`${styles[`card-body-data`]}`}>
        {data?.something || "무언가 데이터"}
      </div>
    </div>
  )
}

export default memo(CardBody)
