import styles from "./CardHeader.module.css"
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai"
import { memo } from "react"
import { useDispatch } from "react-redux" // , useSelector
import {
  modalActions,
  openCategoryModal,
  openCategoryDeleteModal,
  openTaskDeleteModal,
  openTaskModal,
} from "../../../store/door-store/modal-slice"
import CateIcon from "../../CateIcon/CateIcon"

function CardHeader({ data, cardType, deleteSelectedTaskList }) {
  const dispatch = useDispatch()
  // const { isModal, isTask, isDelete, isLoading, isError, formData } =
  //   useSelector((state) => state.modal)
  const openModal = function () {
    dispatch(modalActions.setFormData({ data }))
    if (cardType) {
      dispatch(modalActions.setIsTask())
      dispatch(modalActions.setIsUpdate())
      dispatch(openTaskModal())
    } else {
      dispatch(modalActions.setIsCategory())
      dispatch(modalActions.setIsUpdate())
      dispatch(openCategoryModal())
    }
  }
  const openDeleteModal = function () {
    if (deleteSelectedTaskList) {
      deleteSelectedTaskList()
      return
    } else if (cardType) {
      // dispatch(modalActions.setIsTask())
      dispatch(modalActions.setFormData({ data }))
      dispatch(openTaskDeleteModal())
    } else {
      // dispatch(modalActions.setIsCategory())
      dispatch(modalActions.setFormData({ data }))
      dispatch(openCategoryDeleteModal())
    }
  }
  return (
    <div className={`${styles[`card-header-container`]}`}>
      <div className={`${styles[`card-header-header`]}`}>
        <div
          className={`${styles[`card-header-lights`]}
        bg-cat-${data?.category?.cateColor || data?.cateColor}`}
        >
          {" "}
          <CateIcon value={data?.category?.cateIcon || data?.cateIcon} />{" "}
        </div>

        <div className={`${styles[`card-header-title`]}`}>
          {data?.title || "빈 카드 제목"}
        </div>
      </div>
      {data.column !== "Done" ? (
        <div className={`${styles[`card-header-icon-container`]}`}>
          <AiFillEdit
            className={`${styles[`card-header-icon`]}`}
            onClick={openModal}
          />
          <AiFillCloseCircle
            className={`${styles[`card-header-icon`]}`}
            onClick={openDeleteModal}
          />
        </div>
      ) : (
        <span></span>
      )}
    </div>
  )
}

export default memo(CardHeader)
