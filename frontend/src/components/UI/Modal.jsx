import { useEffect } from "react"
import { useState } from "react"
import ReactDOM from "react-dom"
import styles from "./Modal.module.css"
import { AiOutlineClose } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../store/door-store/modal-slice"
import { SpinnerDots } from "./Spinner"
import DeleteModalForm from "./DeleteModalForm/DeleteModalForm"
import CategoryForm from "./CategoryForm/CategoryForm"
import TaskForm from "./TaskFrom/TaskForm"

/**
 *
 * @isOpen `닫힘 열림`
 * @toggleIsOpen `isOpen 토글 핸들러.`
 * @children 무난한 자식들
 * @returns
 */
function Modal() {
  const dispatch = useDispatch()
  const { isModal, isTask, isDelete, isLoading, isError } = useSelector(
    (state) => state.modal
  )
  const [classes, setClasses] = useState(
    `${styles[`modal-container`]} ${styles[`close`]}`
  )

  useEffect(
    function () {
      if (isModal) {
        setClasses(() => `${styles[`modal-container`]} ${styles[`open`]}`)
      } else {
        setClasses(() => `${styles[`modal-container`]} ${styles[`close`]}`)
      }
    },
    [isModal]
  )
  const onCloseModal = function () {
    dispatch(closeModal())
  }

  return (
    <div>
      {ReactDOM.createPortal(
        <div className={classes}>
          <AiOutlineClose
            className={`${styles[`modal-close-button`]}`}
            onClick={onCloseModal}
          />
          {isLoading ? (
            <SpinnerDots />
          ) : isError ? (
            <div>에러임</div>
          ) : isDelete ? (
            <DeleteModalForm />
          ) : isTask ? (
            <TaskForm />
          ) : (
            <CategoryForm />
          )}
        </div>,
        document.getElementById("overlay-root")
      )}
    </div>
  )
}

export default Modal
