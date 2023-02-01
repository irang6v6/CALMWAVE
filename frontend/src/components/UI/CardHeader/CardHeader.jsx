import styles from "./CardHeader.module.css"
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai"

const colors = [
  `${styles[`card-header-lights-yellow`]}`,
  `${styles[`card-header-lights-red`]}`,
  `${styles[`card-header-lights-green`]}`,
  `${styles[`card-header-lights-blue`]}`,
]

function CardHeader({ data, onSetting, onDelete }) {
  return (
    <div className={`${styles[`card-header-container`]}`}>
      <div className={`${styles[`card-header-header`]}`}>
        <div className={colors[Math.floor(Math.random() * 4)]} />
        <div className={`${styles[`card-header-title`]}`}>
          {data?.title || "빈 카드 제목"}
        </div>
      </div>
      <div className={`${styles[`card-header-icon-container`]}`}>
        <AiFillEdit
          className={`${styles[`card-header-icon`]}`}
          onClick={onSetting}
        />
        <AiFillCloseCircle
          className={`${styles[`card-header-icon`]}`}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

export default CardHeader
