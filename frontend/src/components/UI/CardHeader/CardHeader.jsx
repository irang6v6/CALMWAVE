import styles from "./CardHeader.module.css"
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai"
import { memo } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  modalActions,
  openCategoryModal,
} from "../../../store/door-store/modal-slice"

const colors = [
  `${styles[`card-header-lights-yellow`]}`,
  `${styles[`card-header-lights-red`]}`,
  `${styles[`card-header-lights-green`]}`,
  `${styles[`card-header-lights-blue`]}`,
]

function CardHeader({ data }) {
  const dispatch = useDispatch()
  const { isModal, isTask, isDelete, isLoading, isError, formData } =
    useSelector((state) => state.modal)
  const openModal = function () {
    dispatch(modalActions.setFormData({ data }))
    dispatch(modalActions.toggleIsModal())
  }
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
          onClick={openModal}
        />
        <AiFillCloseCircle
          className={`${styles[`card-header-icon`]}`}
          onClick={openModal}
        />
      </div>
    </div>
  )
}

export default memo(CardHeader)
